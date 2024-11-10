import React, { useState } from 'react'
import './menu.css'
import Profile from '/profile.png'
import Homedash from './Homedash'
import FormRessource from './FormRessource'
function Dashboard() {
  const [activeTab,setActiveTab]= useState('home')
  return (
    <div  className="dash" >
      <div className="menu">
        <ul>
            <li className='profile'>
                <div className="img-box">
                     <img src={Profile} alt="profile" />
                </div>
                <h2>Aissam</h2>
            </li>
            <li>
                <a  onClick={()=>{setActiveTab('home')}}>
                    <i className="fa-solid fa-house"></i>
                    <h2>Home</h2>
                </a>
            </li>
            <li>
                <a  onClick={()=>{setActiveTab('add-ressource')}}>
                    <i className="fa-solid fa-plus"></i>
                    <h2>Add Resource</h2>
                </a>
            </li>
            <li className='loug-out'>
                <a href="">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <h2>Loug Out</h2>
                </a>
            </li>
        </ul>
      </div>
      <div className='content' >
         {activeTab== 'home'&& (
            <Homedash/>
         )}
         {activeTab== 'add-ressource'&& (
            <FormRessource/>
         )}
      </div>
    </div>
  )
}

export default Dashboard
