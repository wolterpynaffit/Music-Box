from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates, Session
from sqlalchemy.exc import NoResultFound
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

from flask import Flask
from config import db

# =============================== USER ==============================


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    # playlist_songs = db.relationship(
    #     "PlaylistSongs", back_populates='contributor'
    # )
    # song = association_proxy('playlist_songs', 'song')
    # playlist = db.relationship("Playlist", back_populates='contributor')
    # serialize_rules = ('-playlist_songs', '-playlist')

# =============================== PLAYLIST=============================


class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    playlist_songs = db.relationship(
        'PlaylistSongs', back_populates='playlist')
    # "playliist_songs" etc.. literal attribute in postman and shows what is in this class
    serialize_rules = ('-playlist_songs.playlist',)
    song = association_proxy('playlist_songs', 'song')

    # playlist_songs = db.relationship(
    #     "PlaylistSongs", back_populates='playlist')
    # song = association_proxy('playlist_songs', 'song')
    # serialize_rules = ('-playlist_songs.playlist', '-contributor.playlist')
# =============================== SONG ==============================


class Song(db.Model, SerializerMixin):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    title = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    album = db.Column(db.String)

    playlist_songs = db.relationship('PlaylistSongs', back_populates='song')
    serialize_rules = ('-playlist_songs.song',)
    # dont innclude song attribute
    playlist = association_proxy('playlist_songs', 'playlist')
    # going through table to get playlist attribute

    # playlist_songs = db.relationship("PlaylistSongs", back_populates='song')
    # playlist = association_proxy('playlist_songs', 'playlist')
    # serialize_rules = ('-playlist_songs.song',)
# =========================== PLAYLIST SONGS  ==========================

# this is the joiner for (playlist and song)
# this is the created playlist with songs in them


class PlaylistSongs(db.Model, SerializerMixin):
    __tablename__ = 'playlist_songs'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))

    playlist = db.relationship('Playlist', back_populates='playlist_songs')
    song = db.relationship('Song', back_populates='playlist_songs')

    serialize_rules = ('-song.playlist_songs', '-playlist.playlist_songs')
    # this is the attribute to the song and playlist table

    # playlist = db.relationship("Playlist", back_populates='playlist_songs')
    # song = db.relationship('Song', back_populates='playlist_songs')
    # serialize_rules = ('-playlist.playlist_songs',
    #                    '-song.playlist_songs', '-contributor.playlist_songs')
