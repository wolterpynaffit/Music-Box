import React, { useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';


function Songs() {
    const [songs, setSongs] = useState([]);
    const [userPlaylist, setUserPlaylist] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // useParams is grabbing playlist details from Individual Playlist Componet .... this doesn't display as key value pairs....
    // const playlistID = useParams()
    // console.log('----------------')
    // console.log(playlistID.title)


    // tyring using state to pass in details from individual component.... This method seems to use the URL details? 
    const location = useLocation()
    console.log(location)
    const { title, id: playlistID, description } = location.state || {}; 

    console.log(title)
    console.log(playlistID)
    console.log(description)

   







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
    const addToPlaylist = async (song) => {
      // TODO: Get user playlist and send playlist ID to backend route
      await fetch(`http://localhost:5555/api/addToPlaylist/${playlistID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
      })
      .then(response => response.json())
      .then(data => {
        setUserPlaylist(prevPlaylist => [...prevPlaylist, data]);
      })
      .catch(err => {
        setError(err.message);
      });
      // console.log(userPlaylist)
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
          {songs.map((song, id) => (
            <div key={id}>
              <p>{song.name}</p>
              <p>{song.album}</p>
              <audio controls>
                <source src={song.preview_url}/>
              </audio>
              <img src= {song.image_url} alt="song cover"/>
              <button onClick={() => addToPlaylist(song)}>Add to Playlist</button>
            </div>
          ))}
        </div>
        <div>
          <h2> {title}{userPlaylist.playlistID}</h2>
          {userPlaylist.map((song, id) => (
            <div key={id}>
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