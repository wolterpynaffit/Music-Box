import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'


function Form () {
  const navigate = useNavigate()
    function handlePost(e){
        e.preventDefault()

        // notes on form data below -- FormData specific to forms
        const formData = new FormData(e.target)
        console.log("User ID:", formData.get('id'));
// making sure the form isn't empty before submitting
        if (formData.get('title').trim() !== '' && formData.get('description') !== ''){
          
          fetch(`http://127.0.0.1:5555/playlists/${1}`, {
            method: 'POST',
            body: formData
          }) 
    
              .then(response => {
                // console.log(response)
                if (response.ok){
                  response.json().then(info => navigate('/playlists'))
                }
                else {
                  throw new Error("Network response was not ok");
                }
              })
              .catch((error)=> {
                console.log("Error:", error)
              })
              
        }
        else {
          console.log('form must not be empty')
        }
      }
  return (
<>
  <div className="container">
    <div>
      <h3> Create a new playlist</h3>
      <span className="material-symbols-outlined">
east
</span>

    </div>
    <div className='form-container'>
      <form onSubmit={handlePost}>
      <label>User ID:
        <input className='input-form' type='text' placeholder="Please enter a user ID..." name='id' />
      </label>
        <label>Playlist Title:
          <input className='input-form' type='text' name='title' placeholder='Name of playlist...'/>
        </label>
        <br />
        <label>Description:
          <input className='input-form' type='text' name='description' placeholder='Enter a description of your playlist...'/>
        </label>
        <br />
        <button className='submit-button'> SUBMIT </button>
      </form>
    </div>
  </div>
</>
  )
  }
  
export default Form



// NOTES ON FORM DATA 
        // setting the data in the form to a javascript native thing called FormData and it is how form data is handled under the hood
            // -----> const formData = new FormData(e.target)
        // console.log(e.target)
        // // e target is hold form entry
    
        // console.log([...formData.entries()].forEach(i => console.log(i)))
        //  this sends every chucnk in form data as a separate console entry
    