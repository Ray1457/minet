import os
import sqlite3
from contextlib import closing
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory, url_for
from marketplace import bp as marketplace_bp
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
import uuid
from dotenv import load_dotenv
import random
from datetime import datetime, timezone, timedelta
import stripe

# Load local .env in development (no-op in production if not present)
load_dotenv()



def create_app():
    app = Flask(__name__)
    # In real apps, set a strong secret via environment variable
    app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", "dev-secret-change-me")
    # Sensitive keys via environment
    app.config['STRIPE_SECRET_KEY'] = os.getenv('STRIPE_SECRET_KEY')
    app.config['STRIPE_PUBLISHABLE_KEY'] = os.getenv('STRIPE_PUBLISHABLE_KEY')
    app.config['FRONTEND_URL'] = os.getenv('FRONTEND_URL', 'http://127.0.0.1:5173')
    if app.config['STRIPE_SECRET_KEY']:
        stripe.api_key = app.config['STRIPE_SECRET_KEY']

    # Allow Vite dev server to call the API in development
    allowed_origins = os.getenv("CORS_ALLOWED_ORIGINS", "*")
    CORS(app, resources={r"/api/*": {"origins": allowed_origins}})

    # Ensure data dir, uploads dir, and database exist
    base_dir = Path(__file__).parent
    data_dir = base_dir / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    db_path = data_dir / "app.db"
    uploads_dir = base_dir / "uploads"
    uploads_dir.mkdir(parents=True, exist_ok=True)

    def get_db_connection():
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row
        return conn

    # Helper: convert a DB timestamp (UTC) to IST ISO8601 string
    def to_ist_iso(value):
        if value is None:
            return None
        # If it's already a datetime, assume UTC-naive or UTC-aware
        if isinstance(value, datetime):
            dt_utc = value if value.tzinfo else value.replace(tzinfo=timezone.utc)
        else:
            s = str(value)
            # Try common SQLite formats
            fmt_variants = [
                "%Y-%m-%d %H:%M:%S",
                "%Y-%m-%d %H:%M:%S.%f",
                "%Y-%m-%dT%H:%M:%S",
                "%Y-%m-%dT%H:%M:%S.%f",
            ]
            dt_utc = None
            for fmt in fmt_variants:
                try:
                    dt_utc = datetime.strptime(s, fmt).replace(tzinfo=timezone.utc)
                    break
                except ValueError:
                    continue
            if dt_utc is None:
                # As a last resort, try parsing as ISO format
                try:
                    parsed = datetime.fromisoformat(s)
                    dt_utc = parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)
                except Exception:
                    # Return the original string if parsing fails
                    return s
        ist = dt_utc.astimezone(timezone(timedelta(hours=5, minutes=30)))
        return ist.isoformat()

    # Initialize DB with a users table if needed and apply simple migrations
    with closing(get_db_connection()) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        # Add columns if missing (simple migration)
        cols = {row[1] for row in conn.execute("PRAGMA table_info(users)").fetchall()}

        def ensure_column(column_def: str, name: str):
            if name not in cols:
                conn.execute(f"ALTER TABLE users ADD COLUMN {column_def}")

        ensure_column("name TEXT", "name")
        ensure_column("age INTEGER", "age")
        ensure_column("address TEXT", "address")
        ensure_column("phone TEXT", "phone")
        ensure_column("profile_picture TEXT", "profile_picture")
        # Products table for marketplace
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT,
                image_url TEXT,
                category TEXT,
                color TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        # Bills table
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS bills (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                month TEXT NOT NULL,
                amount_cents INTEGER NOT NULL,
                currency TEXT NOT NULL DEFAULT 'usd',
                status TEXT NOT NULL DEFAULT 'due', -- 'due' | 'paid'
                stripe_session_id TEXT,
                paid_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
            """
        )
        conn.commit()
    # Register marketplace blueprint
    app.register_blueprint(marketplace_bp)

        # Forums table
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS forums (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                body TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
            """
        )
        # Comments table
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                forum_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(forum_id) REFERENCES forums(id),
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
            """
        )
        conn.commit()


    @app.post("/api/register")
    def register():
        # Support JSON and multipart/form-data. For file upload, use multipart.
        profile_filename = None
        if request.content_type and "multipart/form-data" in request.content_type:
            form = request.form
            email = (form.get("email") or "").strip().lower()
            password = form.get("password") or ""
            name = (form.get("name") or None)
            age_raw = form.get("age")
            address = form.get("address")
            phone = form.get("phone")
            try:
                age = int(age_raw) if age_raw not in (None, "") else None
            except ValueError:
                return jsonify({"error": "Age must be a number."}), 400

            file = request.files.get("profile_picture")
            if file and file.filename:
                filename = secure_filename(file.filename)
                ext = Path(filename).suffix
                unique_name = f"{uuid.uuid4().hex}{ext or ''}"
                file.save(uploads_dir / unique_name)
                profile_filename = unique_name
        else:
            data = request.get_json(silent=True) or {}
            email = (data.get("email") or "").strip().lower()
            password = data.get("password") or ""
            name = data.get("name")
            age = data.get("age") if isinstance(data.get("age"), int) else None
            address = data.get("address")
            phone = data.get("phone")

        if not email or not password:
            return jsonify({"error": "Email and password are required."}), 400

        pwd_hash = generate_password_hash(password)
        try:
            with closing(get_db_connection()) as conn:
                cur = conn.execute(
                    "INSERT INTO users (email, password_hash, name, age, address, phone, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (email, pwd_hash, name, age, address, phone, profile_filename),
                )
                user_id = cur.lastrowid
                # Seed only May, June, July 2000; May paid, June & July due
                seed_rows = [
                    ("May 2000", 'paid'),
                    ("June 2000", 'due'),
                    ("July 2000", 'due'),
                ]
                for month_label, status in seed_rows:
                    amount_cents = random.randint(3000, 10000) # $30 -> $100
                    paid_at = datetime.utcnow() if status == 'paid' else None
                    conn.execute(
                        "INSERT INTO bills (user_id, month, amount_cents, status, paid_at) VALUES (?, ?, ?, ?, ?)",
                        (user_id, month_label, amount_cents, status, paid_at),
                    )
                conn.commit()
        except sqlite3.IntegrityError:
            return jsonify({"error": "Email is already registered."}), 409

        picture_url = f"/uploads/{profile_filename}" if profile_filename else None
        return jsonify({
            "user": {
                "id": user_id,
                "email": email,
                "name": name,
                "age": age,
                "address": address,
                "phone": phone,
                "profile_picture_url": picture_url,
            }
        }), 201

    @app.post("/api/login")
    def login():
        data = request.get_json(silent=True) or {}
        email = (data.get("email") or "").strip().lower()
        password = data.get("password") or ""

        if not email or not password:
            return jsonify({"error": "Email and password are required."}), 400

        with closing(get_db_connection()) as conn:
            row = conn.execute(
                "SELECT id, email, password_hash, name, age, address, phone, profile_picture FROM users WHERE email = ?",
                (email,),
            ).fetchone()

        if not row or not check_password_hash(row["password_hash"], password):
            return jsonify({"error": "Invalid email or password."}), 401

        # For simplicity we don't issue a JWT here. The frontend can store the user object.
        picture_url = f"/uploads/{row['profile_picture']}" if row["profile_picture"] else None
        return jsonify({
            "user": {
                "id": row["id"],
                "email": row["email"],
                "name": row["name"],
                "age": row["age"],
                "address": row["address"],
                "phone": row["phone"],
                "profile_picture_url": picture_url,
            }
        })

    @app.get("/api/bills")
    def get_bills():
        user_id = request.args.get("user_id", type=int)
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400
        with closing(get_db_connection()) as conn:
            rows = conn.execute(
                "SELECT id, month, amount_cents, currency, status, stripe_session_id, paid_at, created_at FROM bills WHERE user_id = ? ORDER BY id ASC",
                (user_id,),
            ).fetchall()
        bills = [
            {
                "id": r["id"],
                "month": r["month"],
                "amount_cents": r["amount_cents"],
                "currency": r["currency"],
                "status": r["status"],
                "stripe_session_id": r["stripe_session_id"],
                "paid_at": to_ist_iso(r["paid_at"]),
                "created_at": to_ist_iso(r["created_at"]),
            }
            for r in rows
        ]
        return jsonify({"bills": bills})

    @app.post("/api/bills/checkout")
    def create_checkout_session():
        if not app.config['STRIPE_SECRET_KEY']:
            return jsonify({"error": "Stripe is not configured"}), 500
        data = request.get_json(silent=True) or {}
        bill_id = data.get("bill_id")
        success_url = data.get("success_url") or f"{app.config['FRONTEND_URL']}/electricity?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = data.get("cancel_url") or f"{app.config['FRONTEND_URL']}/electricity"
        if not bill_id:
            return jsonify({"error": "bill_id is required"}), 400
        with closing(get_db_connection()) as conn:
            bill = conn.execute(
                "SELECT id, user_id, month, amount_cents, currency, status FROM bills WHERE id = ?",
                (bill_id,),
            ).fetchone()
            if not bill:
                return jsonify({"error": "Bill not found"}), 404
            if bill["status"] == "paid":
                return jsonify({"error": "Bill already paid"}), 400

        try:
            session = stripe.checkout.Session.create(
                mode="payment",
                line_items=[{
                    "price_data": {
                        "currency": bill["currency"],
                        "product_data": {"name": f"Electricity bill - {bill['month']}"},
                        "unit_amount": bill["amount_cents"],
                    },
                    "quantity": 1,
                }],
                success_url=success_url,
                cancel_url=cancel_url,
                metadata={"bill_id": str(bill_id)},
            )
        except Exception as e:
            return jsonify({"error": str(e)}), 500

        with closing(get_db_connection()) as conn:
            conn.execute(
                "UPDATE bills SET stripe_session_id = ? WHERE id = ?",
                (session.id, bill_id),
            )
            conn.commit()
        return jsonify({"url": session.url, "session_id": session.id})

    @app.get("/api/bills/checkout-status")
    def checkout_status():
        if not app.config['STRIPE_SECRET_KEY']:
            return jsonify({"error": "Stripe is not configured"}), 500
        session_id = request.args.get("session_id")
        if not session_id:
            return jsonify({"error": "session_id is required"}), 400
        try:
            session = stripe.checkout.Session.retrieve(session_id)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        if session.get("payment_status") == "paid":
            bill_id = session.get("metadata", {}).get("bill_id")
            if bill_id:
                with closing(get_db_connection()) as conn:
                    conn.execute(
                        "UPDATE bills SET status = 'paid', paid_at = ? WHERE id = ?",
                        (datetime.utcnow(), int(bill_id)),
                    )
                    conn.commit()
        return jsonify({"payment_status": session.get("payment_status")})

    # ===== Forums API =====
    @app.get("/api/forums")
    def list_forums():
        q = (request.args.get("q") or "").strip()
        sql = (
            "SELECT f.id, f.title, f.body, f.created_at, f.user_id, "
            "u.name AS author_name, u.email AS author_email, u.profile_picture AS author_pic "
            "FROM forums f LEFT JOIN users u ON u.id = f.user_id "
        )
        args = []
        if q:
            sql += "WHERE f.title LIKE ? "
            args.append(f"%{q}%")
        sql += "ORDER BY f.created_at DESC"
        with closing(get_db_connection()) as conn:
            rows = conn.execute(sql, args).fetchall()
        items = [
            {
                "id": r["id"],
                "title": r["title"],
                "body": r["body"],
                "created_at": to_ist_iso(r["created_at"]),
                "user_id": r["user_id"],
                "author": r["author_name"] or r["author_email"],
                "author_avatar": (f"/uploads/{r['author_pic']}" if r["author_pic"] else None),
            }
            for r in rows
        ]
        return jsonify({"forums": items})

    @app.post("/api/forums")
    def create_forum():
        data = request.get_json(silent=True) or {}
        user_id = data.get("user_id")
        title = (data.get("title") or "").strip()
        body = (data.get("body") or "").strip()
        if not user_id or not title or not body:
            return jsonify({"error": "user_id, title and body are required"}), 400
        with closing(get_db_connection()) as conn:
            cur = conn.execute(
                "INSERT INTO forums (user_id, title, body) VALUES (?, ?, ?)",
                (user_id, title, body),
            )
            forum_id = cur.lastrowid
            conn.commit()
            row = conn.execute(
                "SELECT f.id, f.title, f.body, f.created_at, f.user_id, u.name, u.email, u.profile_picture FROM forums f LEFT JOIN users u ON u.id = f.user_id WHERE f.id = ?",
                (forum_id,),
            ).fetchone()
        return jsonify({
            "forum": {
                "id": row["id"],
                "title": row["title"],
                "body": row["body"],
                "created_at": to_ist_iso(row["created_at"]),
                "user_id": row["user_id"],
                "author": row["name"] or row["email"],
                "author_avatar": (f"/uploads/{row['profile_picture']}" if row["profile_picture"] else None),
            }
        }), 201

    @app.get("/api/forums/<int:forum_id>")
    def get_forum(forum_id: int):
        with closing(get_db_connection()) as conn:
            fr = conn.execute(
                "SELECT f.id, f.title, f.body, f.created_at, f.user_id, u.name, u.email, u.profile_picture FROM forums f LEFT JOIN users u ON u.id = f.user_id WHERE f.id = ?",
                (forum_id,),
            ).fetchone()
            if not fr:
                return jsonify({"error": "Forum not found"}), 404
            crs = conn.execute(
                "SELECT c.id, c.content, c.created_at, c.user_id, u.name, u.email, u.profile_picture FROM comments c LEFT JOIN users u ON u.id = c.user_id WHERE c.forum_id = ? ORDER BY c.created_at ASC",
                (forum_id,),
            ).fetchall()
        comments = [
            {
                "id": r["id"],
                "content": r["content"],
                "created_at": to_ist_iso(r["created_at"]),
                "user_id": r["user_id"],
                "author": r["name"] or r["email"],
                "author_avatar": (f"/uploads/{r['profile_picture']}" if r["profile_picture"] else None),
            }
            for r in crs
        ]
        forum = {
            "id": fr["id"],
            "title": fr["title"],
            "body": fr["body"],
            "created_at": to_ist_iso(fr["created_at"]),
            "user_id": fr["user_id"],
            "author": fr["name"] or fr["email"],
            "author_avatar": (f"/uploads/{fr['profile_picture']}" if fr["profile_picture"] else None),
        }
        return jsonify({"forum": forum, "comments": comments})

    @app.post("/api/forums/<int:forum_id>/comments")
    def add_comment(forum_id: int):
        data = request.get_json(silent=True) or {}
        user_id = data.get("user_id")
        content = (data.get("content") or "").strip()
        if not user_id or not content:
            return jsonify({"error": "user_id and content are required"}), 400
        with closing(get_db_connection()) as conn:
            fr = conn.execute("SELECT id FROM forums WHERE id = ?", (forum_id,)).fetchone()
            if not fr:
                return jsonify({"error": "Forum not found"}), 404
            cur = conn.execute(
                "INSERT INTO comments (forum_id, user_id, content) VALUES (?, ?, ?)",
                (forum_id, user_id, content),
            )
            comment_id = cur.lastrowid
            conn.commit()
            row = conn.execute(
                "SELECT c.id, c.content, c.created_at, c.user_id, u.name, u.email, u.profile_picture FROM comments c LEFT JOIN users u ON u.id = c.user_id WHERE c.id = ?",
                (comment_id,),
            ).fetchone()
        return jsonify({
            "comment": {
                "id": row["id"],
                "content": row["content"],
                "created_at": to_ist_iso(row["created_at"]),
                "user_id": row["user_id"],
                "author": row["name"] or row["email"],
                "author_avatar": (f"/uploads/{row['profile_picture']}" if row["profile_picture"] else None),
            }
        }), 201

    @app.post("/api/bills/reset")
    def reset_bills():
        """Reset a user's bills to May, June, July 2000 with May paid, June/July due."""
        data = request.get_json(silent=True) or {}
        user_id = data.get("user_id")
        if not user_id:
            return jsonify({"error": "user_id is required"}), 400
        with closing(get_db_connection()) as conn:
            # Ensure user exists
            u = conn.execute("SELECT id FROM users WHERE id = ?", (user_id,)).fetchone()
            if not u:
                return jsonify({"error": "User not found"}), 404
            # Delete existing bills
            conn.execute("DELETE FROM bills WHERE user_id = ?", (user_id,))
            # Insert the three target months
            seed_rows = [
                ("May 2000", 'paid'),
                ("June 2000", 'due'),
                ("July 2000", 'due'),
            ]
            for month_label, status in seed_rows:
                amount_cents = random.randint(1500, 7500)
                paid_at = datetime.utcnow() if status == 'paid' else None
                conn.execute(
                    "INSERT INTO bills (user_id, month, amount_cents, status, paid_at) VALUES (?, ?, ?, ?, ?)",
                    (user_id, month_label, amount_cents, status, paid_at),
                )
            conn.commit()
        return jsonify({"ok": True})

    @app.get("/uploads/<path:filename>")
    def get_upload(filename: str):
        # Serve profile pictures
        return send_from_directory(uploads_dir, filename)

    return app


if __name__ == "__main__":
    # Running via `python app.py`
    app = create_app()
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", 5000)), debug=True)
