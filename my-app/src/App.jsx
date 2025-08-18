import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'


import Navbar from './components/Navbar'
import { AuthProvider, useAuth } from './context/AuthContext'


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthNavbarWrapper />
        <Routes>
          <Route path="/" element={<Home />} />        
          <Route path="/login" element={<Login />} />   
          <Route path="/register" element={<Register />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function AuthNavbarWrapper() {
  const { isAuthenticated, logout } = useAuth()
  return <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
}
