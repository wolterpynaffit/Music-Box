import React from 'react'
import {Link} from 'react-router-dom'

function Header () {
  return (
    <>
    <header>
       <nav>
            <Link to = "/"> Home </Link>
            <Link to  = "/playlists"> My Playlist </Link>
        </nav>
    </header>
    </>
  )
}

export default Header