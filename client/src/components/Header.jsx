import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Header () {
  
  const navigate = useNavigate()
  
  function handleClick(){
    navigate('/authenticate')
  }

  return (
    <>
    <header>
       <nav className='navigation'>
            <Link to = "/"> Home </Link>
            <Link to  = "/playlists"> My Playlist </Link>
            <Link to  = "/authenticate"> authenticate </Link>
            <Link to  = "/songs"> songs  </Link>
            <button onClick= {handleClick} className='signout_button'> Sign Out </button>
          {/* sign out button will navigate back to the authentication page */}
        </nav>
    </header>
    </>
  )
}




export default Header