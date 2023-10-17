import React from 'react'
import {Link} from 'react-router-dom'

function Header () {
  return (
    <>
    <header>
        <h1> Music Box </h1>
      
        <nav>
            <Link to = "/"> home </Link>
            <Link to  = "/playlists"> mylist </Link>
        </nav>
    </header>
    </>
  )
}

export default Header