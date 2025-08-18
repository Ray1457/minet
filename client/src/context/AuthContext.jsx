import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

// Base URL for API in production (Render). In dev, leave blank to use Vite proxy.
const API_BASE = (import.meta?.env?.VITE_API_URL || '').replace(/\/$/, '')

function toAbsoluteUrl(path) {
  if (!path) return path
  // Already absolute
  if (/^https?:\/\//i.test(path)) return path
  // Prefix relative backend paths like /uploads/...
  return `${API_BASE}${path}`
}

function normalizeUser(user) {
  if (!user) return user
  return {
    ...user,
    profile_picture_url: toAbsoluteUrl(user.profile_picture_url),
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('auth_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) localStorage.setItem('auth_user', JSON.stringify(user))
      else localStorage.removeItem('auth_user')
    } catch {
      // ignore storage errors
    }
  }, [user])

  const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data?.error || 'Login failed')
    }
  setUser(normalizeUser(data.user))
  }

  const register = async (emailOrPayload, maybePassword) => {
    // Support both register(email, password) and register({ email, password, age, address, phone, profilePicture })
    let res
    if (typeof emailOrPayload === 'object' && emailOrPayload !== null) {
      const { name, email, password, age, address, phone, profilePicture } = emailOrPayload
      const form = new FormData()
      if (name) form.set('name', name)
      form.set('email', email || '')
      form.set('password', password || '')
      if (age !== undefined && age !== null && age !== '') form.set('age', String(age))
      if (address) form.set('address', address)
      if (phone) form.set('phone', phone)
      if (profilePicture instanceof File) form.set('profile_picture', profilePicture)
      res = await fetch(`${API_BASE}/api/register`, { method: 'POST', body: form })
    } else {
      const email = emailOrPayload
      const password = maybePassword
      res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
    }
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data?.error || 'Registration failed')
    }
    setUser(normalizeUser(data.user))
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, register, logout }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
