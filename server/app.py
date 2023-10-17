#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify

# Local imports
# application and connection to data
from config import app, db
from models import User, Playlist, Song, PlaylistSongs

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


@app.get('/playlist/<int:id>')
def get_playlist_id(id):

    playlist = Playlist.query.filter(Playlist.id == id).first()
    if playlist:
        return jsonify(playlist.to_dict()), 200

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
    return jsonify({'message': 'User not found'}), 404


if __name__ == '__main__':
    app.run(port=5555, debug=True)
