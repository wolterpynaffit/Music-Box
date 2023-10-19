import React from 'react'

function Authenticate  () {
  return (
    <>
    <h1>Music Box </h1>
    <form>
        <div>
            <label> Username:
                <input type='text' name='username'/>
            </label>
        </div>
        <div>
            <label> Password:
                <input type='text' name='password'/>
            </label>
        </div>
        <button>
            login
        </button>
        <button>
            sign up 
        </button>
      
    </form>
    </>
  )
}

export default Authenticate


