import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ShareModal from './ShareModal'

import './Playlist.css'
import './IndiePlaylist.css'



function IndividualPlaylist({playlist, onDelete}){

  const navigate = useNavigate()
  const [showShareModal, setShowShareModal] = useState(false)

  function handleClick(){
    // navigating to the songs route and also passing along the details of what is being clicked
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
        onDelete(playlist.id)
  
      } catch (error) {
        console.error('Error deleting playlist:', error);
        alert('Failed to delete the playlist. Please try again.');
      }
    }


  function handleShareButton(){

      setShowShareModal(true);

    }


  console.log(playlist)
  return (
    <div className= 'individual-playlist-card'>
      <div onClick= {handleClick} >
        <h2> {playlist.title}</h2>
        <p>{playlist.description}</p>
      </div>
      <div>
        <button onClick= {handleDelete}> delete </button>
        <span onClick={handleShareButton} className="material-symbols-outlined">
                    share
                </span>
                {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
      </div>
    </div>
  )
}

export default IndividualPlaylist

