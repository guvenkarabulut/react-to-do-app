import React from 'react'
import { auth, provider } from './../firebases';
import "./login.css";

function Login() {
  const login = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message))
  }

  return (
    <div className='login'>
      <div className='container'>
        <button onClick={login}>Google ile giriş yap</button>
      </div>
    </div>
  )
}

export default Login
