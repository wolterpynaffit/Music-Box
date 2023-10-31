import React from 'react'
import {useState, useEffect} from 'react';
import {useLoaderData, useNavigate} from "react-router-dom"
import IndividualPlaylist from './IndividualPlaylist';

import './Playlist.css'


function PlayList () {
const [display, setDisplay] =  useState([])
const [search, setSearch] = useState('')

const {allPlayLists} = useLoaderData()
const navigate = useNavigate()


useEffect(()=> {
  setDisplay(allPlayLists)
}, [allPlayLists])

// filter  logic ---------------------------------
function handleSearch(input){
  setSearch(input)
}
const filteredPlaylists = display.filter((playlist) => playlist.title.toLowerCase().includes(search.toLowerCase()))

//--------------------------------------------------

function handleClick() {
  navigate('/');
  setTimeout(() => {
    const element = document.getElementById('form-id');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100); // 100 milliseconds delay, adjust as needed
}


function handlePlaylistDeletion(id){
  setDisplay((prevPlaylists)=> prevPlaylists.filter(playlist => playlist.id !== id))
}





const mappedPlaylist = allPlayLists.map(playlist => <IndividualPlaylist key = {playlist.id} playlist={playlist}/>)
  return (

    <>
    <div>
      <input
      onChange={(e) => handleSearch(e.target.value)}
      value={search}
      type='text'
      placeholder='Search'
      />

        {filteredPlaylists.length === 0 ? (
          <>
          <h2>You haven't created a playlist yet...</h2>
          <button onClick={handleClick}> click here to begin... </button>
          </>
        ) : (
          <div className="playlist-container">
            {filteredPlaylists.map((playlist) => (
              <IndividualPlaylist key={playlist.id} playlist={playlist} onDelete={handlePlaylistDeletion}/>
            ))}
          </div>
        )}
      </div>
    </>

  )
}

export default PlayList