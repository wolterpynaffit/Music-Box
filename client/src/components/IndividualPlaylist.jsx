import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function IndividualPlaylist({playlist}){

  const navigate = useNavigate()

  function handleClick(){
    navigate('/songs', {state: {title:playlist.title, id:playlist.id, description: playlist.description}}
    
  )}
    
    // ${playlist.title} ${playlist.id} ${playlist.description}`)
    // post request to the songs page

  async function handleDelete(id){
    if (!window.confirm("Are you sure you want to delete this playlist?")) {
      return;
    }
    try {
      const response = await fetch (`http://127.0.0.1:5555/playlists/${playlist.id}`,{
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to delete playlist with ID ${playlist.id}. Status: ${response.status}`);
      }
        // Provide feedback
        alert('Playlist deleted successfully.');

        // Optionally, update the UI, for example:
        window.location.reload();
  
      } catch (error) {
        console.error('Error deleting playlist:', error);
        alert('Failed to delete the playlist. Please try again.');
      }
    }


  console.log(playlist)
  return (
    <div className = 'playlist-card grid col-2 '>
      <div onClick= {handleClick} >
        <h2> {playlist.title}</h2>
        <p>{playlist.description}</p>
      </div>
      <button onClick= {handleDelete}> delete </button>
    </div>
  )
}

export default IndividualPlaylist


// on click of container will navigate to songs page  to grab the playlist name
// 
