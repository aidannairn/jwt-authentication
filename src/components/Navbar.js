import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  
  const { REACT_APP_AXIOS_URL: url } = process.env

  const handleUserLogout = async () => {
    try {
      await axios.delete(`${url}/logout`)
      navigate('/', { replace: true })
    } catch (error) {
      if (error) console.log(error.response.data)
    }
  }

  return (
    <div id="navbar-container">
      <h1>DASHBOARD</h1>
      <nav>
        <h3 className="nav-btn" onClick={handleUserLogout}>
          Log Out
        </h3>
      </nav>
    </div>
  )
}

export default Navbar