from flask import Blueprint, request, jsonify
from contextlib import closing
import sqlite3
from pathlib import Path

bp = Blueprint('marketplace', __name__, url_prefix='/api/marketplace')

def get_db_connection():
    base_dir = Path(__file__).parent
    data_dir = base_dir / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    db_path = data_dir / "app.db"
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

@bp.route('/products', methods=['GET'])
def get_products():
    # Filtering logic can be added here
    with closing(get_db_connection()) as conn:
        rows = conn.execute('SELECT * FROM products').fetchall()
    products = [dict(row) for row in rows]
    return jsonify({'products': products})

@bp.route('/products', methods=['POST'])
def add_product():
    data = request.get_json() or {}
    name = data.get('name')
    price = data.get('price')
    description = data.get('description')
    image_url = data.get('image_url')
    category = data.get('category')
    color = data.get('color')
    if not name or price is None:
        return jsonify({'error': 'Name and price required'}), 400
    with closing(get_db_connection()) as conn:
        cur = conn.execute(
            'INSERT INTO products (name, price, description, image_url, category, color) VALUES (?, ?, ?, ?, ?, ?)',
            (name, price, description, image_url, category, color)
        )
        conn.commit()
        product_id = cur.lastrowid
    return jsonify({'id': product_id}), 201


