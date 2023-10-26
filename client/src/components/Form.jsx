import React from 'react'
import { useNavigate } from 'react-router-dom'

function Form () {
  const navigate = useNavigate()
    function handlePost(e){
        e.preventDefault()

        // notes on form data below -- FormData specific to forms
        const formData = new FormData(e.target)
        console.log(formData)

        // if formData.trim() !== ''{
          
              fetch(`http://127.0.0.1:5555/playlists`, {
                method: 'POST',
                body: formData
              })
              .then(response => {
                console.log(response)
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
      // }
  return (
    <>
    
    <div className = 'form-container' id='form-id'>
      <form onSubmit={handlePost}>
        <label>Name:
          <input type='text' name='title'/>
        </label>
        <br />
        <label>Description:
          <input type='text' name='description' />
        </label>
        <br />
        <button> SUBMIT </button>
      </form>
    </div>
    </>
  )
}

export default Form



// NOTES ON FORM DATA 
        // setting the data in the form to a javascript native thing called FormData and it is how form data is handled under the hood
            // -----> const formData = new FormData(e.target)
        // console.log(e.target)
        // // e target is holld form entry
    
        // console.log([...formData.entries()].forEach(i => console.log(i)))
        //  this sends every chucnk in form data as a separate console entry
    