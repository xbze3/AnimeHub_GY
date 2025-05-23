from mongoengine import Document, StringField, EmailField, ListField, ReferenceField, FloatField, DateTimeField
from flask_jwt_extended import create_access_token, JWTManager, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from datetime import datetime
from flask_cors import CORS 
from bson import ObjectId
import mongoengine as db

import os

load_dotenv()

app = Flask(__name__)

CORS(app)
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

db.connect(
    db=os.getenv("MONGODB_DB"),
    host=os.getenv("MONGODB_HOST"),
    port=int(os.getenv("MONGODB_PORT", 27017)),   
)

class Product(Document):
    title = StringField(required=True)
    image = StringField()
    description = StringField()
    price = FloatField(required=True)

    meta = {'collection': 'products'}

class User(Document):
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    address = StringField()
    phone_number = StringField()
    orders = ListField(ReferenceField('Order'))

    meta = {'collection': 'users'}

class Order(Document):
    user = ReferenceField(User, required=True)
    product_ids = ListField(ReferenceField(Product), required=True)
    product_titles = ListField(StringField(), required=True)
    date = DateTimeField(default=datetime.utcnow)
    email = StringField(required=True)
    address = StringField(required=True)

    meta = {'collection': 'orders'}
    


@app.route("/products", methods=["GET"])
def get_all_products():
    products = Product.objects()

    return jsonify([
        {
            "_id": str(product.id),
            "title": product.title,
            "image": product.image,
            "description": product.description,
            "price": product.price
        }
        for product in products
    ]), 200

@app.route("/order", methods=["POST"])
@jwt_required()
def place_order():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        product_ids = data.get("product_ids")

        print("Received data:", data)

        if not user_id or not product_ids:
            return jsonify({"error": "Missing user_id or product_ids"}), 400

        user = User.objects(id=ObjectId(user_id)).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        object_ids = [ObjectId(pid) for pid in product_ids]
        products = Product.objects(id__in=object_ids)
        if not products:
            return jsonify({"error": "No valid products found"}), 400

        product_titles = [product.title for product in products]

        order = Order(
            user=user,
            product_ids=products,
            product_titles=product_titles,
            email=user.email,
            address=user.address
        )
        order.save()

        user.orders.append(order)
        user.save()

        return jsonify({
            "message": "Order placed successfully",
            "order_id": str(order.id)
        }), 201

    except Exception as e:
        return jsonify({"error": "Failed to place order", "details": str(e)}), 500

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if User.objects(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_pw = generate_password_hash(data['password'])

    user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_pw,
        address=data.get('address', ''),
        phone_number=data.get('phone_number', '')
    )
    user.save()

    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        "message": "User created successfully",
        "username": user.username,
        "user_Id": str(user.id),
        "token": access_token}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = User.objects(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Login successful",
        "user_id": str(user.id),
        "username": user.username,
        "user_Id": str(user.id),
        "token": access_token
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
