import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import ForumList from './pages/ForumList'
import ForumDetail from './pages/ForumDetail'
import ForumCreate from './pages/ForumCreate'
import Marketplace from './pages/Marketplace'
import ProductDetail from './pages/ProductDetail'

import Navbar from './components/Navbar'
import { AuthProvider, useAuth } from './context/AuthContext'


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
  <FirstVisitModal />
        <AuthNavbarWrapper />
        <Routes>
          <Route path="/" element={<Home />} />        
          <Route path="/login" element={<Login />} />   
          <Route path="/register" element={<Register />} /> 
          <Route path="/price" element={<Price />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<ProductDetail />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/scam-alert" element={<Scammer />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/map" element={<MapPage />} />
          <Route
            path="/electricity"
            element={
              <ProtectedRoute>
                <Electricity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <ForumList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum/new"
            element={
              <ProtectedRoute>
                <ForumCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum/:id"
            element={
              <ProtectedRoute>
                <ForumDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function AuthNavbarWrapper() {
  const { isAuthenticated, logout } = useAuth()
  return <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}

function FirstVisitModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('firstVisitModalShown')
    if (!hasSeen) {
      setOpen(true)
      sessionStorage.setItem('firstVisitModalShown', 'true')
    }
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] max-w-xl rounded-lg bg-white p-6 shadow-xl text-gray-900">
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          {/* Multiplication sign for close */}
          <span className="block text-xl leading-none">
            <ion-icon name="close-circle-outline"></ion-icon>
          </span>
        </button>
        {/* <h2 className="mb-2 text-xl font-semibold">Welcome to MINET</h2>
        <p className="mb-4 text-gray-600">
          Here’s a quick tip: use the navigation bar to explore prices, marketplace, forums, and more.
        </p> */}
        <div className='h-72 text-gray-800 flex items-center justify-center gap-5 text-5xl'>
            <span className='block font-bold text-green-700'>XINO</span>
            <span className='text-red-600 '>
              <ion-icon name="heart"></ion-icon>
            </span>
            
            <span className='block font-bold text-blue-800'>MINET</span>
        </div>
      </div>
    </div>
  )
}
