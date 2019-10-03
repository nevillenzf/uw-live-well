from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy

import os
import datetime
import json

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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
                return "New user added. User id={}".format(user.id)
            except Exception as e:
                return (str(e))

@app.route('/fblogin', methods=['POST'])
def fb_login():
    #Receives a json file with User information including
    #Create new user if it does not exist else returns an error message
    data = request.get_json(force=True);
    if request.method == 'POST':
        #Check if user exist in database
        query = db.execute("SELECT * FROM users WHERE fbID={} AND fbAccessToken={};"
                    .format(data.fbID,data.fbAccessToken))
        print(query)
        return "poop", 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
