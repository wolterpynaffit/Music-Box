import React, {useEffect} from 'react'
import Header from './Header'
import Form from './Form'
import "./Home.css"

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.vh-100.bg-image.img-blur');
      if (window.scrollY > 0) {
        section?.classList?.add('scrolling');
      } else {
        section?.classList?.remove('scrolling');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
    <section className = 'vh-100 bg-image img-blur'>
      <div className = 'blurred-img'>
        <h1 className = "MB-title">
         Music Box </h1>
        <div className="get_started">
          <a href ="#form-id">
            <button className='blob'></button>
          </a>
          <p> click here to get started</p>
        </div>
      </div>
    </section>

    <section  id = "form-id" className='vh-100 form-section'>
      <div >
          <Form/>
      </div>
    </section>
    </>
  )
}

export default Home