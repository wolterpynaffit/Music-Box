import React from 'react'
import Header from './Header'
import Form from './Form'
import "./Home.css"

const Home = () => {
  return (
    <>
    <section className = 'vh-100'>
      <div>
        <p className = 'welcome'> Welcome to </p>
        <h1> Music Box </h1>
        <div className="get_started">
          <a href ="#form-id">
            <button className='blob'></button>
          </a>
          <p> click here to get started</p>
        </div>
      </div>
    </section>

    <section className='vh-100 form-section'>
      <div >
          <Form/>
      </div>
    </section>
    </>
  )
}

export default Home