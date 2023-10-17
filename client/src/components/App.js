
import Header from './Header'
import Main from "./Main";


function App() {
  // const navigate = useNavigate()
  const [playlist, setPlaylist] = useState([])


  // useEffect(()=> {
  //   fetch('/songs')
  //   .then( response => response.json())
  //   .then(playlists => setPlaylist(playlists))
  // },[])

  //console.log(playlist)

  function handlePost(e){
    e.preventDefault()


    // setting the data in the form to a javascript native thing called FormData and it is how form data is handled under the hood
    const formData = new FormData(e.target)
    // console.log(e.target)
    // // e target is holld form entry

    // console.log([...formData.entries()].forEach(i => console.log(i)))
    //  this sends every chucnk in form data as a separate console entry

    fetch('http://127.0.0.1:5555/playlists', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok){
        // also then navigate to a frontend  route res.json().then(something => navigate('/route'))
        throw new Error("Network response was not ok");
      }

    })
    .catch((error)=> {
      console.log("Error:", error)
    })
    
  }


  return (
    <>
    <Outlet/>
    <form onSubmit={handlePost}>
      <label> Name:
        <input type='text' name='title'/>
      </label>
      <label> description:
        <input type='text' name='description'/>
      </label>
  
      <button> SUBMIT </button>
    </form>
    </>
  )
}

export default App;

