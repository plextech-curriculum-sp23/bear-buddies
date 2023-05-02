from flask import Flask, request, jsonify, session
from flask_cors import CORS
import datetime as datetime

from models import db
from models.user import User
from models.event import Event

# Setup

app = Flask(__name__)
app.secret_key = 'plextech'


CORS(app) # To prevent CORS errors during local development
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

app.config["MONGODB_HOST"] = "mongodb+srv://username:Password1234@cluster0.z5glouc.mongodb.net/?retryWrites=true&w=majority"


db.init_app(app)


# Routes
@app.route('/ping')
def pingpong():
    return "pong"

@app.route('/create-user', methods = ['POST'])
def create_user():
    body = request.get_json()
    new_user = User(**body).save()
    return jsonify(new_user)

@app.route('/create-event', methods = ['POST'])
def create_event():
    date = datetime.datetime.strptime(request.json['time'], '%Y-%m-%d %H:%M:%S')
    if ("participants" in request.get_json()):
        people = request.json['participants']
    else:
        people = []
    new_event = Event(
        title = request.json['title'],
        time = date,
        description = request.json['description'],
        max_participants = request.json['max_participants'],
        location = request.json['location'],
        owner = request.json['owner'],
        participants = people
    ).save()
    return jsonify(new_event)

@app.route('/signup', methods = ['POST'])
def signup():
    data =request.get_json()
    given_email = data.get('email')
    #check if the email already exists in database
    if User.objects(email=given_email).first():
        return jsonify({'error': 'this email already has an account associated with it, please login'}),

    new_user = User(
        email = data['email'],
        password = data['password'],
        first_name = data['first_name'],
        last_name = data['last_name'],
        gender = data['gender'],
        phone_number = data['phone_number'],
        graduation_year = data['graduation_year'],
        major = data['major']
    ).save()
    
    return jsonify({'success': 'user created successfully'})

@app.route('/login', methods = ['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.objects(email=email, password=password).first()
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 400
    
    session['user_id'] = str(user.id)
    return jsonify(user);
    
=======
@app.route('/delete-event', methods = ['DELETE'])
def delete_event():
    idNum = request.json['id']
    deletedEvent = Event.objects.get(id=idNum)
    deletedEvent.delete()
    return jsonify(deletedEvent)

@app.route('/delete-user', methods = ['DELETE'])
def delete_user():
    idNum = request.json['id']
    deletedUser = User.objects.get(id=idNum)
    deletedUser.delete()
    return jsonify(deletedUser)

@app.route('/get-user', methods = ['GET'])
def get_user():
    idNum = request.args.get('id')
    returnedUser = User.objects.get(id=idNum)
    return jsonify(returnedUser)

@app.route('/get-event', methods = ['GET'])
def get_event():
    idNum = request.args.get('id')
    returnedEvent = Event.objects.get(id=idNum)
    return jsonify(returnedEvent)

@app.route('/update-event', methods = ['PUT'])
def update_event():
    changes = request.get_json()
    idNum = changes['id']
    changedEvent = Event.objects.get(id=idNum)
    changedEvent.update(**changes)
    return jsonify(changedEvent)

@app.route('/update-user', methods = ['PUT'])
def update_user():
    changes = request.get_json()
    idNum = changes['id']
    changedEvent = User.objects.get(id=idNum)
    changedEvent.update(**changes)
    return jsonify(changedEvent)

@app.route('/get-all-events', methods = ['GET'])
def get_all_events():
    doc = Event.objects()
    return jsonify(doc)

if __name__ == "__main__":
    app.run(debug=True)
