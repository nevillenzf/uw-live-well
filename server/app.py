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

from models import User, House

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
        parsed_data = request.get_json(force=True)
        data = parsed_data["user_info"]

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


@app.route('/login', methods=['POST'])
def login():
    #Receives a json file with User information including
    #Create new user if it does not exist else returns an error message
    parsed_data = request.get_json(force=True)
    data = parsed_data["user_info"]

    if request.method == 'POST':
        #Check if user exist in database if not, create new user using fbID and token
        query = User.query.filter_by(email=data["email"],
                                     password=data["password"]).first()
        if query is not None:
            #Account already exists SUCCESS
            listing_query = House.query.filter_by(poster_id=query.serialize()["id"]).all()
            #could be empty
            result = query.serialize()

            if listing_query is not None:
                result["listings"] = [item.serialize() for item in listing_query]
            return jsonify(result), 200
        else:

            return "Failed",200

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
            listing_query = House.query.filter_by(poster_id=query.serialize()["id"]).all()
            #could be empty
            result = query.serialize()

            if listing_query is not None:
                result["listings"] = [item.serialize() for item in listing_query]
            return jsonify(result), 200
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

@app.route('/addListing', methods=['POST'])
def add_listing():
    #Receives a json file with User information including
    #Create new user if it does not exist else returns an error message
    parsed_data = request.get_json(force=True)
    data = parsed_data["formVals"]

    if request.method == 'POST':
        #Need not to query database to cross check, maybe in future implementations

        title = data["title"]
        address = data["address"]
        rent = data["rent"]
        type = data["type"]
        bathrooms = data["bathrooms"]
        bedrooms = data["bedrooms"]
        poster_id = data["poster_id"]
        curr_roommates = data["roommates"]
        pref_gender = data["gender_pref"]

        try:
            house=House(
                title=title,
                address=address,
                rent=rent,
                type=type,
                bathrooms=bathrooms,
                bedrooms=bedrooms,
                poster_id=poster_id,
                curr_roommates=curr_roommates,
                pref_gender=pref_gender
            )
            db.session.add(house)
            db.session.commit()
            print("New house added. House id={}\n".format(house.id))
            user_id = User.query.filter_by(id=poster_id).first()
            user_name = user_id.serialize()["name"]
            house["user_name"] = user_name
            return jsonify(house.serialize()), 200
        except Exception as e:
            return (str(e))

@app.route('/addFavorite', methods=['POST'])
def add_favorite():
    #Receives a json file with User information including
    #Create new user if it does not exist else returns an error message
    parsed_data = request.get_json(force=True)
    data = parsed_data["formVals"]

    if request.method == 'POST':
        #Need not to query database to cross check, maybe in future implementations

        user_id = data["user_id"]
        house_id = data["house_id"]

        try:
            favorite=Favorite(
                user_id=user_id,
                house_id=house_id,
            )
            db.session.add(favorite)
            db.session.commit()
            print("New favorite added for user id={} House id={}\n" \
            .format(favorite.user_id, favorite.house_id))
            house = House.query.filter_by(id=house_id).first()
            return jsonify(house.serialize()), 200
        except Exception as e:
            return (str(e))

#Redirect all listing queries here
@app.route('/listings', methods=['POST'])
def query_listings():
    #Receives a json file with User information including
    #Create new user if it does not exist else returns an error message
    data = request.get_json(force=True)
    #Check data to check for houses that matches description
    #enforce more than 5
    if request.method == 'POST':
        #Check if user exist in database if not, create new user using fbID and token
        if (data["roommates"][1] == 5):
            data["roommates"][1] = 999 #remove limit of roommates
        try:
            query = House.query. filter(House.rent >=data["rent"][0]). \
                                    filter(House.rent <=data["rent"][1]). \
                                    filter(House.curr_roommates>=data["roommates"][0]). \
                                    filter(House.curr_roommates<=data["roommates"][1])
            listings = query.all()
            responsePrep = [item.serialize() for item in listings]
            #Add username into the list
            for item in responsePrep:
                user_id = User.query.filter_by(id=item["poster_id"]).first()
                #Get username
                user_name = user_id.serialize()["name"]
                item["user_name"] = user_name

            return jsonify(responsePrep), 200
        except Exception as e:
            return (str(e))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
