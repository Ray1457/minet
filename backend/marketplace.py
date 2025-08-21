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
    if not name or price is None:
        return jsonify({'error': 'Name and price required'}), 400
    with closing(get_db_connection()) as conn:
        cur = conn.execute(
            'INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)',
            (name, price, description, image_url, category)
        )
        conn.commit()
        product_id = cur.lastrowid
    return jsonify({'id': product_id}), 201

@bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id: int):
    """Return a single product by id or 404"""
    with closing(get_db_connection()) as conn:
        row = conn.execute('SELECT * FROM products WHERE id = ?', (product_id,)).fetchone()
    if not row:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify({'product': dict(row)})

@bp.route('/products/seed', methods=['POST'])
def seed_products():
    """Add sample products to the marketplace"""
    sample_products = [
        { 'name': 'Sugarcane', 'price': 10, 'description': 'Fresh sugarcane stalks', 'image_url': 'data/products/sugarcane.png', 'category': 'Fruits and Vegetables' },
        { 'name': '.COM Chess', 'price': 20, 'description': 'Collectible .COM branded chess set', 'image_url': 'data/products/com_chess.png', 'category': 'Games' },
        { 'name': 'Wheat', 'price': 10, 'description': 'High-quality wheat grain pack', 'image_url': 'data/products/wheat.png', 'category': 'Fruits and Vegetables' },
        { 'name': 'Oven', 'price': 10, 'description': 'Small electric oven for kitchens', 'image_url': 'data/products/oven.png', 'category': 'Electronics' },
        { 'name': 'Orange', 'price': 10, 'description': 'Fresh orange (1kg)', 'image_url': 'data/products/orange.png', 'category': 'Fruits and Vegetables' },
        { 'name': 'Shirt', 'price': 10, 'description': 'Official uniform shirt', 'image_url': 'data/products/shirt.png', 'category': 'Clothes' }
    ]
    
    with closing(get_db_connection()) as conn:
        # Clear existing products first
        conn.execute('DELETE FROM products')
        
        # Insert sample products
        for product in sample_products:
            conn.execute(
                'INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)',
                (product['name'], product['price'], product['description'], 
                 product['image_url'], product['category'])
            )
        conn.commit()
    
    return jsonify({'message': f'Successfully added {len(sample_products)} sample products'}), 201
