from models import *

class Event(db.Document):
    title = db.StringField(required=True)
    time = db.DateTimeField(required=True)
    description = db.StringField(required=True)
    max_participants = db.IntField(required=True)
    owner = db.ReferenceField('User', required=True)
    location = db.StringField(required=True)
    participants = db.ListField(db.ReferenceField('User'))
    image = db.ImageField()