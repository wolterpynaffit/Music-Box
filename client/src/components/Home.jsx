import React from 'react'
import Header from './Header'
import Form from './Form'
import "./Home.css"

const Home = () => {
  return (
    <>
    <div className = 'vh-100'>
      <p className = 'welcome'> Welcome to </p>
      <h1> Music Box </h1>
      <div className="get_started">
        <a href ="#form-id">
          <button className='start-button'></button>
        </a>
        <p> click here to get started</p>
      </div>
    </div>

    <div className='vh-100'>
        <Form/>
    </div>
    </>
  )
}

export default Home