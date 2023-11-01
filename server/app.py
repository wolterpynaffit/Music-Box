#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
import requests
from sqlalchemy.orm import joinedload

# Local imports
from spotify import get_token
from models import User, Playlist, Song, PlaylistSongs
# application and connection to data
from config import app, db
import ipdb


# Add your model imports
# This is handling the USER LOGIN ------------------------------------------------

app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'

bcrypt = Bcrypt(app)

# bcrypt.generate_password_hash(password).decode('utf-8')
# bcrypt.check_password_hash(hashed_password, password)


def get_current_user():
    return User.query.filter(User.id == session.get("user_id")).first()


def logged_in():
    return bool(get_current_user())


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'
# -----------------------------------------------------------------------
# --------------------- This is handling the USER LOGIN -----------------
# -----------------------------------------------------------------------
# USER SIGNUP #


@app.post('/users/register')
def create_user():
    json = request.json
    pw_hash = bcrypt.generate_password_hash(json['password']).decode('utf-8')
    new_user = User(username=json['username'], password_hash=pw_hash)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id
    return new_user.to_dict(), 201


# SESSION LOGIN/LOGOUT#

@app.post('/login')
def login():
    json = request.json
    user = User.query.where(User.username == json["username"]).first()
    if user and bcrypt.check_password_hash(user.password_hash, json['password']):
        session['user_id'] = user.id
        return user.to_dict(), 201
    else:
        return {'message': 'Invalid username or password'}, 401


@app.get('/current_session')
def check_session():
    if logged_in():
        print(get_current_user())
        return get_current_user().to_dict(), 200
    else:
        return {}, 401


@app.delete('/logout')
def logout():
    session['user_id'] = None
    return {}, 204

# -----------------------------------------------------------------------
# --------------------- PLAYLIST ROUTES  --------------------------------
# -----------------------------------------------------------------------

# this route is used inn the songs component useEffect to display 'persist' the users playlist.


@app.get('/playlist_songs/<int:id>')
def getUserPlaylist(id):
    userPlaylists = PlaylistSongs.query.filter(
        PlaylistSongs.playlist_id == id).all()

    userPlaylist_dict = [userPlaylist.to_dict()
                         for userPlaylist in userPlaylists]

    return jsonify(userPlaylist_dict), 200


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


# # this is using the form
# @app.post('/playlists')
# def create_playlist():
#     print(request.form.get)
#     # data = request.json
#     title = request.form.get('title')
#     description = request.form.get('description')
#     # this is matching the form input field

#     new_playlist = Playlist(title=title, description=description)
#     db.session.add(new_playlist)
#     db.session.commit()
#     return jsonify(new_playlist.to_dict()), 201
# # this is using the form


@app.post('/playlists/<int:id>')
def create_playlist(id):

    # playlists = Playlist.query.filter(Playlist.id == id).first()

    # if playlists:
    print(request.form.get)
    # data = request.json
    title = request.form.get('title')
    description = request.form.get('description')
    user_id = request.form.get('id')
    # this is matching the form input field

    new_playlist = Playlist(user_id=user_id, title=title,
                            description=description)
    db.session.add(new_playlist)
    db.session.commit()
    return jsonify(new_playlist.to_dict()), 201
    # else:
    #     # Return an appropriate response if no matching playlist is found
    #     return jsonify({"error": "No matching playlist found"}), 400


@app.delete('/playlists/<int:id>')
def delete_playlist(id):
    # delete wasn't working with query.filter[Playlist.id =id] The following correction successfully deletes. Whyyyy though?
    playlist = Playlist.query.filter_by(id=id).first()
    if playlist:
        print(f'deleting playlist with id: {id}')
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
# -----------------------------------------------------------------------
# --------------------- SONG ROUTES  -----------------------------------
# -----------------------------------------------------------------------


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


# -----------------------------------------------------------------------
# # -------------------- SPOTIFY  ---------------------------------------
# -----------------------------------------------------------------------


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

# ----------------------------------------------------------
# THIS WILL ADD TO THE USERS PLAYLIST BUT DOES NOT PERSIST
# ----------------------------------------------------------


# @app.post('/playlists/<int:id>/songs')
# def add_song_to_playlist(id):
#     playlist = Playlist.query.filter(Playlist.id == id).first()
#     if playlist:
#         data = request.json
#         song = Song(**data)
#         # Assuming you've set up your relationships in the models correctly
#         playlist.songs.append(song)
#         db.session.commit()
#         return jsonify(song.to_dict()), 201
#     return jsonify({'message': 'Playlist not found'}), 404


# @app.route("/api/addToPlaylist/<int:playlist_id>", methods=["POST"])
# def add_to_playlist(playlist_id):
#     # STRUCTURE OF PLAYLIST OBJECT:
#     #   {
#     #       ID,
#     #       TITLE,
#     #       DESCRIPTION,
#     #       USER_ID
#     #   }
#     # ... logic to add the song to a user's playlist ...
#     # print(f"\n\nMY SOOOOONG: {song}\n\n")
#     playlist = Playlist.query.filter(Playlist.id == playlist_id).first()
#     print(playlist)
#     print('---------------------')
#     if playlist:
#         song = request.json
#         print(song)
#         print('---------------------')
#         playlist.append(song)
#     db.session.add(playlist)
#     db.session.commit()
#     return song

#     return jsonify({"message": "Song added successfully!"})

# ----------------------------------------------------------------------- BELOW  IS ADDING  A SONG TO THE PLAYLIST ------------------------------------------------------------------
@app.route("/api/addToPlaylist/<int:playlist_id>", methods=["POST"])
def add_to_playlist(playlist_id):
    playlist = Playlist.query.filter(Playlist.id == playlist_id).first()

    if not playlist:
        return jsonify({"message": "Playlist not found"}), 404

    song_data = request.json

    # Check if the song already exists in the database
    song = Song.query.filter_by(
        id=song_data['id']).first()

    # If the song doesn't exist, create a new song record
    if not song:
        song = Song(
            id=song_data['id'], title=song_data["name"], artist=song_data["artists"][0], album=song_data.get("album", ""))
        db.session.add(song)
        db.session.flush()  # To get the ID assigned before the commit

    # Always create a new association between the song and playlist (even if it already exists)
    playlist_song_association = PlaylistSongs(
        playlist_id=playlist.id, song_id=song.id)
    db.session.add(playlist_song_association)

    db.session.commit()

    # Serialize the song data to return
    return jsonify(playlist_song_association.to_dict())


if __name__ == '__main__':
    print("hello")  # critically important
    app.run(port=5555, debug=True)
