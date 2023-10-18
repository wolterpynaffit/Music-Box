
import Header from './Header'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'




function App() {
  // const navigate = useNavigate()
  // const [playlist, setPlaylist] = useState([])


  // useEffect(()=> {
  //   fetch('/songs')
  //   .then( response => response.json())
  //   .then(playlists => setPlaylist(playlists))
  // },[])

  // console.log(playlist)

  return (
    <>
    <Header/>
    <Outlet/>

    </>
  )
}

export default App;

