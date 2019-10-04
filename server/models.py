from app import db
import datetime

class User(db.Model):
    __tablename__ = 'users'

    #If logging in through Facebook, DOES NOT require password
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    password = db.Column(db.String())
    pic_url = db.Column(db.String()) #this is going to hold a URL
    email = db.Column(db.String(), nullable=False)
    fbAccessToken = db.Column(db.String(), nullable=True)
    fbID = db.Column(db.Numeric, nullable=True)

    #In the future initialize pic_url with None but when pulled back to React, just full from app storage
    def __init__(self, name, email, password=None, pic_url=None, fbAccessToken=None, fbID=None):
        self.name = name
        self.email = email
        if fbAccessToken is not None:
            self.fbAccessToken = fbAccessToken
            self.fbID = fbID
            self.password = None #Regardless of what's passed into the parameters
            self.pic_url= pic_url
        else:
            self.fbAccessToken = None
            self.fbID = None
            self.password = password
            self.pic_url = pic_url

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'password': self.password,
            'pic_url':self.pic_url,
            'email': self.email,
            'fbAccessToken': self.fbAccessToken,
            'fbID': '{}'.format(self.fbID),
        }

class House(db.Model):
    __tablename__ = 'houses'

    #If logging in through Facebook, DOES NOT require password
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(), nullable=False)
    rent = db.Column(db.Float, nullable=False) #this is going to hold a URL
    title = db.Column(db.String(), nullable=False)
    type = db.Column(db.Integer, nullable=False) #0 for apt, #1 for house
    pref_gender = db.Column(db.Integer) #0 for male, 1 for female, #2 for non-binary
    bathrooms = db.Column(db.Integer)
    bedrooms = db.Column(db.Integer)
    poster_id = db.Column(db.Integer)
    curr_roommates = db.Column(db.Integer)

    #In the future initialize pic_url with None but when pulled back to React, just full from app storage
    def __init__(self, address, rent, title, type, bathrooms,
                bedrooms, poster_id, curr_roommates=0,pref_gender=None):
        self.title = title
        self.address = address
        self.rent = rent
        self.type = type
        self.bathrooms = bathrooms
        self.bedrooms = bedrooms
        self.poster_id = poster_id
        self.curr_roommates = curr_roommates
        self.pref_gender = pref_gender

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'address': self.address,
            'rent': self.rent,
            'type':self.type,
            'bathrooms': self.bathrooms,
            'bedrooms': self.bedrooms,
            'poster_id': self.poster_id,
            'curr_roommates': self.poster_id,
            'pref_gender': self.pref_gender,
        }
