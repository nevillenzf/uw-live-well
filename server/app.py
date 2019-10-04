from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import os
import datetime
import json

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)

from models import User

@app.route('/')
def index():
    return 'This is the web server with the PostgreSQL database shit'

#User related methods go here may branch out into its own file in the future
@app.route('/user', methods=['GET','POST'])
def user():
    #Get user information
    if request.method == 'GET':
        data = request.get_json(force=True)
        result = db.session.query(User).all()
        return jsonify([r.serialize() for r in result]), 200

    #Create new user OR logging in
    if request.method == 'POST':
        data = request.get_json(force=True);
        print(data["name"])
        query = User.query.filter_by(name=data["name"])
        print(query.serialize())
        return "okay", 200

@app.route('/register', methods=['POST'])
def register_acc():
    #Receives a json file with User information including
    #Create new user if it does not exist else returns an error message
    if request.method == 'POST':
        print("Attempting to create new user")
        data = request.get_json(force=True)
        #Check if email already exist in database
        query = User.query.filter_by(email=data["email"]).first()

        #CREATE NEW USER
        if query is not None:
            print(query.serialize())
            return jsonify(query.serialize()), 200
        else:
            print("Creating new user\n")
            name = data["name"]
            email = data["email"]
            password = data["password"]
            try:
                user=User(
                    name=name,
                    email=email,
                    password=password
                )
                db.session.add(user)
                db.session.commit()
                print("New user added. User id={}".format(user.id))

                return jsonify(user.serialize()), 200
            except Exception as e:
                return (str(e))

@app.route('/fblogin', methods=['POST'])
def fb_login():
    #Receives a json file with User information including
    #Create new user if it does not exist else returns an error message
    parsed_data = request.get_json(force=True)
    data = parsed_data["user_info"]

    if request.method == 'POST':
        #Check if user exist in database if not, create new user using fbID and token
        query = User.query.filter_by(email=data["email"],
                                     fbID=data["fbID"]).first()

        if query is not None:
            #FB-login account already exists
            return jsonify(query.serialize()), 200
        else:
            #password not required for fb user
            name = data["name"]
            email = data["email"]
            fbAccessToken = data["fbAccessToken"]
            fbID = data["fbID"]
            pic_url = data["pic_url"]
            try:
                user=User(
                    name=name,
                    email=email,
                    fbAccessToken=fbAccessToken,
                    fbID=fbID,
                    pic_url=pic_url
                )
                db.session.add(user)
                db.session.commit()
                print("New user added. User id={}\n".format(user.id))
                return jsonify(user.serialize()), 200
            except Exception as e:
                return (str(e))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
