from mongoengine import Document, StringField, EmailField, ListField, ReferenceField, FloatField, DateTimeField
from flask import Flask, jsonify, request, render_template
from datetime import datetime
import mongoengine as db
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

db.connect(
    db=os.getenv("MONGODB_DB"),
    host=os.getenv("MONGODB_HOST"),
    port=int(os.getenv("MONGODB_PORT", 27017)),   
)

# Data Models

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
    date = DateTimeField(default=datetime.utcnow)

    meta = {'collection': 'orders'}

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
    return jsonify({"message": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = User.objects(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "user_id": str(user.id)}), 200

if __name__ == '__main__':
    app.run(debug=True)
