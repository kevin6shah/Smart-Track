from flask import Flask
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore


app = Flask(__name__)
CORS(app)
default_app = firebase_admin.initialize_app()
db = firestore.client()

from app import routes