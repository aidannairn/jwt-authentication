import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()

  const handleUserLogout = async () => {
    try {
      await axios.delete('/logout')
      navigate('/', { replace: true })
    } catch (error) {
      if (error) console.log(error.response.data)
    }
  }

  return (
    <div id="navbar-container">
      <h1>DASHBOARD</h1>
      <div className="nav-btn">
        Home
      </div>
      <div className="nav-btn" onClick={handleUserLogout}>
        Log Out
      </div>
    </div>
  )
}

export default Navbar