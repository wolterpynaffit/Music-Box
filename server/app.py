#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from models import User, Playlist, Song, PlaylistSongs
from flask_cors import CORS
from flask import request, jsonify, session
from flask_bcrypt import Bcrypt
# Local imports
from spotify import get_token
# application and connection to data
from config import app, db
import ipdb
import requests
CORS(app)

# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# --------------------- PLAYLIST ROUTES  -------------------------


@app.get('/playlists')
def get_playlist():
    playlists = Playlist.query.all()
    playlist_dict = [playlist.to_dict() for playlist in playlists]
    return jsonify(playlist_dict), 200

# current user.id


@app.get('/playlist/<int:id>')
def get_playlist_id(id):

    playlists = Playlist.query.filter(Playlist.user_id == 1).all()
    if playlists:
        playlist_dict = [playlist.to_dict() for playlist in playlists]
        return jsonify(playlist_dict), 200

    return jsonify({'message': 'Playlist not found'}), 404


# this is using the form
@app.post('/playlists')
def create_playlist():
    print(request.form.get)
    # data = request.json
    title = request.form.get('title')
    description = request.form.get('description')
    # this is matching the form input field

    new_playlist = Playlist(title=title, description=description)
    db.session.add(new_playlist)
    db.session.commit()
    return jsonify(new_playlist.to_dict()), 201


@app.delete('/playlists/<int:id>')
def delete_playlist(id):
    playlist = Playlist.query.filter[Playlist.id == id].first()
    if playlist:
        db.session.delete(playlist)
        db.session.commit()
        return jsonify(playlist.to_dict()), 204

    return jsonify({'message': 'Playlist not found'}), 404


@app.patch('/playlists/<int:id>')
def update_playlist(id):
    playlist = Playlist.query.filter(Playlist.id == id).first()
    if playlist:
        data = request.json
        for key, value in data.items():
            setattr(playlist, key, value)
        db.session.commit()
        return jsonify(playlist.to_dict()), 200
    return jsonify({'message': 'Playlist not found'}), 404
# --------------------- SONG ROUTES  -------------------------


@app.get('/songs')
def get_songs():
    songs = Song.query.all()
    song_dict = [song.to_dict() for song in songs]
    return jsonify(song_dict), 200


@app.get('/songs/<int:id>')
def get_song_id(id):

    song = Song.query.filter(Song.id == id).first()
    if song:
        return jsonify(song.to_dict()), 200
    return jsonify({'message': 'song not found'}), 404


@app.post('/playlists/<int:id>/songs')
def add_song_to_playlist(id):
    playlist = Playlist.query.filter(Playlist.id == id).first()
    if playlist:
        data = request.json
        song = Song(**data)
        # Assuming you've set up your relationships in the models correctly
        playlist.songs.append(song)
        db.session.commit()
        return jsonify(song.to_dict()), 201
    return jsonify({'message': 'Playlist not found'}), 404


# --------------------- USERS  ROUTES  -------------------------
# need helper methods for current user.
@app.get('/users')
def get_users():
    users = User.query.all()
    user_dict = [user.to_dict() for user in users]

    return jsonify(user_dict), 200


@app.get('/users/<int:id>')
def get_user_byid(id):
    user = User.query.filter(User.id == id).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    else:
        return jsonify(user.to_dict()), 200


@app.post('/users/register')
def create_users():
    data = request.json
    new_user = User(**data)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201


@app.post('/users/login')
def create_login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()
    if user and user.password == data.get('password'):
        # how to hash password?
        return jsonify(user.to_dict()), 200
    return jsonify({'message': 'Invalid credentials'}), 401


@app.put('/users/<int:id>')
def update_user(id):
    user = User.query.filter(User.id == id).first()
    if user:
        data = request.json
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return jsonify(user.to_dict()), 200
    return jsonify({'message': 'User not found'}), 404


@app.delete('/users/<int:id>')
def delete_user(id):
    user = User.query.filter(User.id == id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify(user.to_dict()), 204
    return jsonify({'message': 'User not found'}),
# # -------------------- SPOTIFY  ----------------------


@app.route("/api/search", methods=["GET"])
def search_spotify():
    query = request.args.get('q')
    token = get_token()
    headers = {
        "Authorization": f"Bearer {token}"
    }
    # Limiting to 10 results for demonstration
    search_url = f"https://api.spotify.com/v1/search?q={query}&type=track&limit=20"
    response = requests.get(search_url, headers=headers)
    song_results = response.json().get("tracks", {}).get("items", [])
    songs = [{
        "id": song["id"],
        "name": song["name"],
        "artists": [artist["name"] for artist in song["artists"]],
        "album": song["album"]["name"],
        "preview_url": song["preview_url"],
        "image_url": song["album"]["images"][0]["url"] if song["album"]["images"] else None
    } for song in song_results]
    return jsonify(songs)


@app.route("/api/addToPlaylist", methods=["POST"])
def add_to_playlist():
    song = request.json
    # ... logic to add the song to a user's playlist ...
    return jsonify({"message": "Song added successfully!"})


# # -------------------- LOGIN SETUP ----------------------

# bcrypt = Bcrypt(app)


# def get_current_user():
#     return User.query.where(User.id == session.get("user_id")).first()


# def logged_in():
#     return bool(get_current_user())


# @app.post('/login')
# def login():
#     json = request.json
#     user = User.query.where(User.username == json["username"]).first()
#     if user and bcrypt.check_password_hash(user.password_hash, json['password']):
#         session['user_id'] = user.id
#         return user.to_dict(), 201
#     else:
#         return {'message': 'Invalid username or password'}, 401


# @app.get('/current_session')
# def check_session():
#     if logged_in():
#         return get_current_user().to_dict(), 200
#     else:
#         return {}, 401


# @app.delete('/logout')
# def logout():
#     session['user_id'] = None
#     return {}, 204

# # -------------------- SIGN UP ----------------------
# # USER SIGNUP #


# @app.post('/users')
# def create_user():
#     json = request.json
#     pw_hash = bcrypt.generate_password_hash(json['password']).decode('utf-8')
#     new_user = User(username=json['username'], password_hash=pw_hash)
#     db.session.add(new_user)
#     db.session.commit()
#     session['user_id'] = new_user.id
#     return new_user.to_dict(), 201

# ipdb.set_trace()

if __name__ == '__main__':
    print("hello")  # critically important
    app.run(port=5555, debug=True)
