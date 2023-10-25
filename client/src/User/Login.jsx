import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login ({attemptLogin}) {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate()


    

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)
  


    function handleSubmit(e){

      e.preventDefault()

      // fetch('http://127.0.0.1:5555/users')
      // .then(response => response.json())
      // .the(response => {

      // })
      attemptLogin({username, password})
          
    }

  return (
    <>
    <form onChange={handleSubmit}>
      <input type="text"
      onChange={handleChangeUsername}
      value={username}
      placeholder='username'
      />

      <input type="text"
      onChange={handleChangePassword}
      value={password}
      placeholder='password'
      />

      <input type="submit"
      value='Login'
      />
    </form>
    </>
  )
}

export default Login