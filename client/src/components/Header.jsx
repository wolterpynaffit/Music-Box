import React from 'react'
import {Link} from 'react-router-dom'


function Header () {
  return (
    <>
    <header>
       <nav className='navigation'>
            <Link to = "/"> Home </Link>
            <Link to  = "/playlists"> My Playlist </Link>
            <Link to  = "/authenticate"> authenticate </Link>
            <button className='signout_button'> Sign Out </button>
        </nav>
    </header>
    </>
  )
}




export default Header