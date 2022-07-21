import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={[
          <Navbar key='navbar' />,
          <Dashboard key='dashboard' />
        ]} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
