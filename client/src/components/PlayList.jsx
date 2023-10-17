import React from 'react'
import {useState} from 'react';
import {useLoaderData, useNavigate} from "react-router-dom"


function PlayList () {

const [...allPlaylists] = useLoaderData()
console.log(allPlaylists)
  return (

    <>
        {allPlaylists}
    </>

  )
}

export default PlayList