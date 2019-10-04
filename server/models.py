from app import db

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
