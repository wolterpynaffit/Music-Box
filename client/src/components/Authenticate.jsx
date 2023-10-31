import React from 'react'
import { useState, useEffect } from 'react'
import Login from '/Users/tiffanypretlow/Desktop/Development/code/FIS-SE-NYC/phase-5/Music-Box/client/src/components/Login.jsx'
import SignUp from '/Users/tiffanypretlow/Desktop/Development/code/FIS-SE-NYC/phase-5/Music-Box/client/src/components/Signup.jsx'
import { useNavigate } from 'react-router-dom'

function Authenticate  () {
    // const [displayLogin, setDisplayLogin] = useState('')
    const [currentUser, setCurrentUser] = useState(null)
    const  navigate = useNavigate()

    useEffect(() => {
        fetch('/current_session')
        .then(res => {
            if(res.ok){
                res.json()
                .then(user => setCurrentUser(user))
            }
        })
    
    })

    function attemptLogin(userInfo){
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accepts' : 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => {
                if (res.ok){
                   res.json()
                   .then(user => setCurrentUser(user))
                   navigate('/playlists')
                }
            })
        }
    

    function attemptSignup(userInfo){
        fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accepts' : 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => {
                if (res.ok){
                   res.json()
                   .then(user => setCurrentUser(user))
                }
            })
        }
    function logout(){
        setCurrentUser(null)
        fetch('/logout', {method: 'DELETE'})
    }
    
  return (
    <>
    <h1 className= 'MB-title'>Music Box </h1>
    {!currentUser ? <Login attemptLogin={attemptLogin}/> : null }
    {!currentUser ?  <SignUp attemptSignup={attemptSignup} /> : null}
    


    </>
  )
}

export default Authenticate


