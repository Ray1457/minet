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
        {
            'name': 'Government Laptop',
            'price': 45000,
            'description': 'High-performance laptop for government employees with security features',
            'image_url': '/uploads/laptop.jpg',
            'category': 'Electronics',
            'color': 'Black'
        },
        {
            'name': 'Official Uniform Shirt',
            'price': 1200,
            'description': 'Standard government employee uniform shirt in cotton blend',
            'image_url': '/uploads/shirt.jpg',
            'category': 'Clothes',
            'color': 'Blue'
        },
        {
            'name': 'Fresh Apples',
            'price': 150,
            'description': 'Organic apples from government farms, 1kg pack',
            'image_url': '/uploads/apples.jpg',
            'category': 'Fruits and Vegetables',
            'color': 'Red'
        },
        {
            'name': 'Civil Service Handbook',
            'price': 500,
            'description': 'Complete guide to civil service procedures and regulations',
            'image_url': '/uploads/handbook.jpg',
            'category': 'Books',
            'color': 'Blue'
        },
        {
            'name': 'Government Phone',
            'price': 25000,
            'description': 'Secure smartphone for government officials with encrypted communication',
            'image_url': '/uploads/phone.jpg',
            'category': 'Electronics',
            'color': 'Black'
        },
        {
            'name': 'Official Blazer',
            'price': 3500,
            'description': 'Formal blazer for government ceremonies and meetings',
            'image_url': '/uploads/blazer.jpg',
            'category': 'Clothes',
            'color': 'Purple'
        },
        {
            'name': 'Organic Rice',
            'price': 80,
            'description': 'Premium basmati rice from government agricultural schemes, 1kg',
            'image_url': '/uploads/rice.jpg',
            'category': 'Fruits and Vegetables',
            'color': 'Yellow'
        },
        {
            'name': 'Constitution of UPM',
            'price': 300,
            'description': 'Official constitution book of United Pingdom of Minet',
            'image_url': '/uploads/constitution.jpg',
            'category': 'Books',
            'color': 'Green'
        },
        {
            'name': 'LED Monitor',
            'price': 15000,
            'description': '24-inch LED monitor for government offices',
            'image_url': '/uploads/monitor.jpg',
            'category': 'Electronics',
            'color': 'Black'
        },
        {
            'name': 'Safety Vest',
            'price': 800,
            'description': 'High-visibility safety vest for government workers',
            'image_url': '/uploads/vest.jpg',
            'category': 'Clothes',
            'color': 'Yellow'
        }
    ]
    
    with closing(get_db_connection()) as conn:
        # Clear existing products first
        conn.execute('DELETE FROM products')
        
        # Insert sample products
        for product in sample_products:
            conn.execute(
                'INSERT INTO products (name, price, description, image_url, category, color) VALUES (?, ?, ?, ?, ?, ?)',
                (product['name'], product['price'], product['description'], 
                 product['image_url'], product['category'], product['color'])
            )
        conn.commit()
    
    return jsonify({'message': f'Successfully added {len(sample_products)} sample products'}), 201
