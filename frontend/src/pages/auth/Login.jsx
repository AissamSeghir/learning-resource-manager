import React from 'react'
import Logo from '/logo.svg'
import './auth.css'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='formAuth'>
      <form >
        <h2>Welcom Back</h2>
        <div>
            <img src={Logo} alt="logo" />
        </div>
        <label htmlFor="">Email*</label>
        <input type="email" placeholder='You@example.com' />
        <label htmlFor="">Password*</label>
        <input type="password" />
        <button>Sing in</button>
        <p>Don't have an account? <span><Link to='/singup'>Sing up </Link></span></p>
      </form>
    </div>
  )
}

export default Login
