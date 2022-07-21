import { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  
  const navigate = useNavigate()

  const { REACT_APP_AXIOS_URL: url } = process.env

  const handleInputChange = (e, type) => {
    if (type === 'email') return setEmail(e.target.value)
    if (type === 'password') return setPassword(e.target.value)
  }

  const handleUserLogin = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${url}/login`, {
        email,
        password
      })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      if (error) return setMsg(error.response.data)
    }
  }

  return (
    <div id="auth-container">
      <div id="login-container">
        <h1>Login</h1>
        {msg !== '' && <p>{msg}</p>}
        <form id="login-form" onSubmit={handleUserLogin}>
          <input type="email" placeholder='your-email@example.com' value={email} onChange={e => handleInputChange(e, 'email')}/>
          <input type="password" placeholder='Password' value={password} onChange={e => handleInputChange(e, 'password')}/>
          <input type="submit" value="Login" />
        </form>
        <p>Don't have an account? <Link to="/signup">Click Here</Link> to sign up!</p>
      </div>
    </div>
  )
}

export default Login