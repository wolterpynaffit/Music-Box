import React, { useState, useEffect } from 'react';

function Songs() {
    const [songs, setSongs] = useState([]);
    const [userPlaylist, setUserPlaylist] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = () => {
      fetch(`http://localhost:5555/api/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          setSongs(data);
        })
        .catch(err => {
          setError(err.message);
        });
    };
    const addToPlaylist = (song) => {
      fetch('http://localhost:5555/api/addToPlaylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
      })
      .then(response => response.json())
      .then(data => {
        setUserPlaylist(prevPlaylist => [...prevPlaylist, song]);
      })
      .catch(err => {
        setError(err.message);
      });
    };
    return (
      <>
        <h2>Search for a song to add to your playlist ...</h2>
        <input 
          type="text" 
          placeholder="Search for songs..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
        <div>
          {error && <p>Error: {error}</p>}
          {songs.map((song, idx) => (
            <div key={idx}>
              <p>{song.name}</p>
              <button onClick={() => addToPlaylist(song)}>Add to Playlist</button>
            </div>
          ))}
        </div>
        <div>
          <h2>User's Playlist</h2>
          {userPlaylist.map((song, idx) => (
            <div key={idx}>
              <p>{song.name}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
export default Songs;





// import React from 'react'

// function Songs(){
//   return (
//     <>
// <h2> This page will have spotify api/playlist to add songs to</h2>
//     <div>
// {/* spotify songs will map here */}
// {/* should also include a search/filter feature */}
//     </div>
//     <div>
// {/* <h1> playlist name will go here </h1> */}
// {/* This side will have an empty container (or exisiting songs) */}
// {/* map any existing songs, added songs to playlist container */}

//     </div>
//     </>
//   )
// }

// export default Songs