import React, { useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './Songs.css'


function Songs() {
    const [songs, setSongs] = useState([]);
    const [userPlaylist, setUserPlaylist] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// SECTION BELOW USED TO PASS DETAILS OF CLICKED PLAYLIST INTO THE SONGS COMPONENENT
// -------------------------------------------------------------------------------
// trying to use state to pass in details from individual component.... This method seems to use the URL details? (with this i have access to the playlist attibutes)

//_________ here, location = useLocation is RECIEVING the clicked playlist info for use in this component_____________
const location = useLocation()
const { title, id: playlistID, description } = location.state || {}; 
// console.log(location)
// console.log(title)
// console.log(playlistID)
// console.log(description)

// -------------------------------------------------------------------------------
// ----------------------- SEARCH FOR A PLAYLIST ----------------------------------

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
// -------------------------------------------------------------------------------
    const addToPlaylist = async (song) => {

      await fetch(`http://localhost:5555/api/addToPlaylist/${playlistID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
      })
      .then(response => response.json())
      .then(data => {
        console.log('------user playlist printing below---------------')
        console.log(userPlaylist)
        console.log(userPlaylist[0])
        console.log(userPlaylist[0].song)
        console.log(userPlaylist[0].song.title)
        console.log(userPlaylist[0].playlistID)
        console.log(data)
        
        console.log('--------------------------------------------------')
        setUserPlaylist(prevPlaylist => [...prevPlaylist, data]);
      })
      .catch(err => {
        setError(err.message);
      });
      // console.log(userPlaylist)
    };
    // -------------------------------------------------------------------------------
    // ---------------- BELOW ALLOWS PLAYLIST TO PERSIST -----------------------------
    function whatIsUserPlaylist(){
      userPlaylist.map((playlistSong) => {
        console.log('------PLAYLISTSONG PRINTING BELOW---------------')
        console.log(playlistSong);  // This will print the current playlistSong object
        console.log('-----------------------------------------------')
      })
    }
    useEffect(()=> {
      fetch(`http://localhost:5555/playlist_songs/${playlistID}`)
      .then(response=> response.json())
      .then(data => {
        console.log("Fetched data:", data);
        setUserPlaylist(data)
        console.log('------ what is user playlist function being called....---------------')
   
        whatIsUserPlaylist();
        console.log('---------------------------------------------------------------------')
      })
    },[playlistID])
    
// ------------------------------- THIS VERSION RESULTS IN ERROR, WONT ADD TO PLAYLIST BECAUSE CAN'T IDENTIFY ATTRIBUTES ----------------------------
// userPlaylist returns an array of objects [{}]
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                        <h2>Search for a song to add to your playlist ...</h2>
                        <input
                            type="text"
                            placeholder="Search for songs..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <button onClick={handleSearch}>Search</button>
                        <div>
                            {error && <p>Error: {error}</p>}
                            {songs.map((song, index) => (
                                <div key={song.id || index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <img src={song.image_url} alt="song cover" style={{ width: '200px', height: '200px', marginRight: '10px' }} />
                                    <div>
                                        <p>{song.name}</p>
                                        <p>{song.album}</p>
                                        <audio controls>
                                            <source src={song.preview_url} />
                                        </audio>
                                    </div>
                                    <button onClick={() => addToPlaylist(song)} style={{ marginLeft: '10px' }}>Add to Playlist</button>
                                </div>
                            ))}
                        </div>
                    </div>
    
                    <div style={{ flex: 1 }}>
                        <h2>{title} {userPlaylist.playlistID}</h2>
                        {userPlaylist.map((playlistSong, index) => (
                            <div key={playlistSong.id || playlistSong.song_id || index}>
                                <p>{playlistSong.song.title}</p> 
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
    
    export default Songs;
    


// // --------- Below is just demo to display styled version. just need to extract this css, put in css file and then delete code block  
//  ______________________________________--- BELOW VERSION WILL ADD TO PLAYLIST BUT NOT PERSIST--- ____________________________________
// other notes... only grabs details of one song (first added) to attach to id, playlist_id etc?.... other added songs just display --> name: 'song name'



//     return (
//         <>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <div style={{ flex: 1, paddingRight: '20px' }}>
//                     <h2>Search for a song to add to your playlist ...</h2>
//                     <input
//                         type="text"
//                         placeholder="Search for songs..."
//                         value={searchTerm}
//                         onChange={e => setSearchTerm(e.target.value)}
//                         style={{ width: '100%', marginBottom: '10px' }}
//                     />
//                     <button onClick={handleSearch}>Search</button>
//                     <div>
//                         {error && <p>Error: {error}</p>}
//                         {songs.map((song, id) => (
//                             <div key={id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//                                 <img src={song.image_url} alt="song cover" style={{ width: '200px', height: '200px', marginRight: '10px' }} />
//                                 <div>
//                                     <p>{song.name}</p>
//                                     <p>{song.album}</p>
//                                     <audio controls>
//                                         <source src={song.preview_url} />
//                                     </audio>
//                                 </div>
//                                 <button onClick={() => addToPlaylist(song)} style={{ marginLeft: '10px' }}>Add to Playlist</button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>


//                 <div style={{ flex: 1 }}>
//                     <h2>{title} {userPlaylist.playlistID}</h2>
//                     {userPlaylist.map((song, id) => (
//                         <div key={id}>
//                             <p>{song.name}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }
// export default Songs;
  
















































//     // this is the working code... neet to add CSS Classes and then delete the other code block below....

// //     return (
// //       <>
// //         <h2>Search for a song to add to your playlist ...</h2>
// //         <input 
// //           type="text" 
// //           placeholder="Search for songs..." 
// //           value={searchTerm} 
// //           onChange={e => setSearchTerm(e.target.value)} 
// //         />
// //         <button onClick={handleSearch}>Search</button>
// //         <div>
// //           {error && <p>Error: {error}</p>}
// //           {songs.map((song, id) => (
// //             <div key={id}>
// //               <p>{song.name}</p>
// //               <p>{song.album}</p>
// //               <audio controls>
// //                 <source src={song.preview_url}/>
// //               </audio>
// //               <img src= {song.image_url} alt="song cover"/>
// //               <button onClick={() => addToPlaylist(song)}>Add to Playlist</button>
// //             </div>
// //           ))}
// //         </div>
// //         <div>
// //           <h2> {title}{userPlaylist.playlistID}</h2>
// //           {userPlaylist.map((song, id) => (
// //             <div key={id}>
// //               <p>{song.name}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </>
// //     );
// //   }
// // export default Songs;
