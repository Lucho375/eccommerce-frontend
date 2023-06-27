import { createContext, useEffect, useState } from 'react'
import { ForgotPassword, Login, Logout, ResetPassword, Signup } from '../api/auth'
import { axiosPrivate } from '../api/axios'
import jwtDecode from 'jwt-decode'
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ isAuthenticated: false })

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  // Check existing session
  useEffect(() => {
    const getInitialAccessToken = async () => {
      try {
        const response = await axiosPrivate.get('/sessions/refresh-token')
        const decoded = jwtDecode(response.data.payload)
        setAuth({
          user: decoded,
          accessToken: response.data.payload,
          isAuthenticated: true,
          isAdmin: decoded.role === 'admin'
        })
      } catch (error) {
        console.log(error)
      }
    }
    getInitialAccessToken()
  }, [])

  const signup = async userData => await Signup(userData)

  const login = async credentials => {
    if (auth?.isAuthenticated) return
    const response = await Login(credentials)
    if (response.status === 200) {
      const decoded = jwtDecode(response.data.payload)
      setAuth({
        user: decoded,
        accessToken: response.data.payload,
        isAuthenticated: true,
        isAdmin: decoded.role === 'admin'
      })
      navigate(from, { replace: true })
    }
  }

  const logout = async () => {
    if (!auth?.isAuthenticated) return
    const response = await Logout()
    if (response.status === 204) {
      setAuth({ isAuthenticated: false })
      navigate('/login')
    }
  }

  const forgotPassword = async () => await ForgotPassword()

  const resetPassword = async (token, password) => await ResetPassword(token, password)

  return (
    <AuthContext.Provider value={{ auth, setAuth, signup, login, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
