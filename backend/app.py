import os
import sqlite3
from contextlib import closing
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory, url_for
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
import uuid


def create_app():
    app = Flask(__name__)
    # In real apps, set a strong secret via environment variable
    app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY", "dev-secret-change-me")

    # Allow Vite dev server to call the API in development
    CORS(app, resources={r"/api/*": {"origins": "*"}})

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
        conn.commit()

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

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
                conn.execute(
                    "INSERT INTO users (email, password_hash, name, age, address, phone, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (email, pwd_hash, name, age, address, phone, profile_filename),
                )
                conn.commit()
        except sqlite3.IntegrityError:
            return jsonify({"error": "Email is already registered."}), 409

        picture_url = f"/uploads/{profile_filename}" if profile_filename else None
        return jsonify({
            "user": {
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
                "email": row["email"],
                "name": row["name"],
                "age": row["age"],
                "address": row["address"],
                "phone": row["phone"],
                "profile_picture_url": picture_url,
            }
        })

    @app.get("/uploads/<path:filename>")
    def get_upload(filename: str):
        # Serve profile pictures
        return send_from_directory(uploads_dir, filename)

    return app


if __name__ == "__main__":
    # Running via `python app.py`
    app = create_app()
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", 5000)), debug=True)
