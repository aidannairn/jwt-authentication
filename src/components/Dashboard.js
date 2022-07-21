import { useState, useEffect } from 'react'
import axios from 'axios';
import jwtDecode from "jwt-decode"
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('')
  const [token, setToken] = useState('')
  const [expire, setExpire] = useState('')
  const [users, setUsers] = useState([])

  const navigate = useNavigate()
  
  const { REACT_APP_AXIOS_URL: url } = process.env

  useEffect(() => {
    refreshToken()
    getUsers()
  }, [])

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${url}/token`)
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setFirstName(decoded.fName)
      setExpire(decoded.exp)
    } catch (error) {
      if (error.response) {
        navigate('/', { replace: true })
      }
    }
  }

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date()
    
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(`${url}/token`)
      config.headers.Authorization = `Bearer ${response.data.accessToken}`
      setToken(response.data.accessToken)
      const decoded = jwtDecode(response.data.accessToken)
      setFirstName(decoded.fName)
      setExpire(decoded.exp)
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  const getUsers = async () => {
    const response = await axiosJWT.get(`${url}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setUsers(response.data)
  }


  return (
    <div id="dashboard-container">
      <h2>Welcome back, {firstName}</h2>
      <table id="dashboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userID} >
              <td>{index + 1}</td>
              <td>{user.fName}</td>
              <td>{user.lName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard