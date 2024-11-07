import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login'
import Singup from './pages/auth/Singup';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/singup' element={<Singup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
