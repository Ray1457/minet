import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

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

  const login = async (email, _password) => {
    // TODO: replace with real API auth
    setUser({ email })
  }

  const register = async (email, _password) => {
    // TODO: replace with real API registration
    setUser({ email })
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
