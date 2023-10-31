#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Playlist, Song, PlaylistSongs

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        # Clear existing data
        print("Clearing db...")
        PlaylistSongs.query.delete()
        Playlist.query.delete()
        Song.query.delete()
        User.query.delete()

# ------------------------- USERS ----------------------------------------------

        print("Creating users...")
        user_list = []
        for _ in range(1):  # creating 15 random users
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password=fake.password()
            )
            user_list.append(user)
        db.session.add_all(user_list)
        db.session.commit()

# ------------------------- SONGS ----------------------------------------------
        # Seed songs
        print("Creating songs...")
        song_list = []
        for _ in range(1):  # creating 50 random songs
            song = Song(
                id=fake.name(),
                title=fake.name(),
                artist=fake.name(),
                album=fake.word()
            )
            song_list.append(song)
        db.session.add_all(song_list)
        db.session.commit()
# -------------------------- PLAYLISTS -----------------------------------------

        # Seed playlists
        print("Creating playlists...")
        playlist_list = []
        for _ in range(2):  # creating a playlist for each user
            playlist = Playlist(
                title=f"{user.username}'s Favorites",
                description=f"Some of {user.username}'s favorite tracks.",
                user_id=user.id
            )
            playlist_list.append(playlist)
        db.session.add_all(playlist_list)
        db.session.commit()

# ----------------------- SONGS IN PLAYLIST ------------------------------------
        # Seed playlist songs
        print("Creating playlist songs...")
        playlist_song_list = []
        for playlist in playlist_list:
            # adding 5 random songs to each playlist
            for _ in range(2):
                ps = PlaylistSongs(
                    playlist=playlist,
                    song=rc(song_list),
                    user=user,

                )
                playlist_song_list.append(ps)
        db.session.add_all(playlist_song_list)
        db.session.commit()

        print("Seeding complete!")
