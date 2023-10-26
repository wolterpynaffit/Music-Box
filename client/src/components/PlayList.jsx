import React from 'react'
import {useState} from 'react';
import {useLoaderData, useNavigate} from "react-router-dom"
import IndividualPlaylist from './IndividualPlaylist';


function PlayList () {
const [display, setDisplay] =  useState([])

const {allPlayLists} = useLoaderData()
console.log(`WHOOOOOOOOOO ${allPlayLists}`)

const mappedPlaylist = allPlayLists.map(playlist => <IndividualPlaylist key = {playlist.id} playlist={playlist}/>)
  return (

    <>
    <h2> Nothing will be here until playlist is created </h2>
    
    <div className="playlist-container">
    {mappedPlaylist}
    </div>

  {/* 
    ---- need to create a toggle message/ something like if no playlist has been created, then display a message to a user
  
    ---- OTHERWISE, show the mapped playlists
  
  ----  need to get playlists from database and map here 

  ---- display it as div containers with album cover and name of the playlist displayng 
  
  */}
    </>

  )
}

export default PlayList