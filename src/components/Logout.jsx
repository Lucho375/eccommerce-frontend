import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

export default function Logout() {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const logout = async () => {
    try {
      setAuth({})
      const response = await axios.get('/session/logout', { withCredentials: true })
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return logout
}
