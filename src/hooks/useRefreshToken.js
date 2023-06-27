import axios from '../api/axios'
import useAuth from './useAuth'

export default function useRefreshToken() {
  const { setAuth } = useAuth()

  const refresh = async () => {
    try {
      const response = await axios.get('/sessions/refresh-token', { withCredentials: true })
      setAuth(prev => {
        return {
          ...prev,
          accessToken: response.data.payload
        }
      })
      return response.data.payload
    } catch (error) {
      if (error.response.status === 401) {
        setAuth({ isAuthenticated: false })
      }
    }
  }
  return refresh
}
