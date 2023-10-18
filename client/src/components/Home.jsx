import React from 'react'
import Header from './Header'
import Form from './Form'

const Home = () => {
  return (
    <>
    <div>
      <p className = 'welcome'> Welcome to </p>
      <h1> Music Box </h1>
    </div>
    <div className="get_started">
      <button>
        BUTTON
      </button>
      <p> click here to get started</p>
    </div>
        <Form/>
    </>
  )
}

export default Home