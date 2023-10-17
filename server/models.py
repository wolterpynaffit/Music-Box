from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates, Session
from sqlalchemy.exc import NoResultFound
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

from flask import Flask
from config import db

# Models go here!

# =============================== USER ==================================#


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    playlist_songs = db.relationship(
        "PlaylistSongs", back_populates='contributor')
    song = association_proxy('playlist_songs', 'song')
    serialize_rules = ('-playlist_songs.contributor', )

# =============================== PLAYLIST =============================#


class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    playlist_songs = db.relationship(
        "PlaylistSongs", back_populates='playlist')
    song = association_proxy('playlist_songs', 'song')
    serialize_rules = ('-playlist_songs.playlist', )

# =============================== SONG ==================================#


class Song(db.Model, SerializerMixin):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    album = db.Column(db.String)

    playlist_songs = db.relationship("PlaylistSongs", back_populates='song')
    playlist = association_proxy('playlist_songs', 'playlist')
    serialize_rules = ('-playlist_songs.song', )

# =============================== PLAYLIST SONGS ==================================#


class PlaylistSongs(db.Model, SerializerMixin):
    __tablename__ = 'playlist_songs'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    contributor_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    playlist = db.relationship("Playlist", back_populates='playlist_songs')
    song = db.relationship("Song", back_populates='playlist_songs')
    contributor = db.relationship("User", back_populates='playlist_songs')
    serialize_rules = ('-playlist.playlist_songs',
                       '-song.playlist_songs', '-contributor.playlist_songs')
