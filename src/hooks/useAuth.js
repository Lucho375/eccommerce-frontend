import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('AuthContext must be inside a AuthProvider')
  return context
}
