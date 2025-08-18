import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Price from './pages/Price'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Tutorials from './pages/Tutorials'
import Scammer from './pages/Scammer'
import Healthcare from './pages/Health'
import MapPage from './pages/Map'
import Electricity from './pages/Electrcity'



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
          <Route path="/price" element={<Price />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/scam-alert" element={<Scammer />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/electricity" element={<Electricity />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function AuthNavbarWrapper() {
  const { isAuthenticated, logout } = useAuth()
  return <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
}
