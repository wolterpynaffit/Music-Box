import React from 'react'
import {useState} from 'react';
import {useLoaderData, useNavigate} from "react-router-dom"
import IndividualPlaylist from './IndividualPlaylist';


function PlayList () {
const [display, setDisplay] =  useState([])
const [search, setSearch] = useState('')

const {allPlayLists} = useLoaderData()
const navigate = useNavigate()
// console.log(`WHOOOOOOOOOO ${allPlayLists}`)



// filter  logic ---------------------------------
// search for a playlist
function handleSearch(input){
  setSearch(input)
}
const filteredPlaylists = allPlayLists.filter((playlist) => playlist.title.toLowerCase().includes(search.toLowerCase()))

// filter  logic ---------------------------------

// function handleClick(){
//   navigate('/ #form-id')

// }
function handleClick() {
  navigate('/');
  setTimeout(() => {
    const element = document.getElementById('form-id');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100); // 100 milliseconds delay, adjust as needed
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
              <IndividualPlaylist key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </div>
    </>

  )
}

export default PlayList