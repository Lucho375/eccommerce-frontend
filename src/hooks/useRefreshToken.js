import axios from '../api/axios'
import useAuth from './useAuth'
import { useToast } from '@chakra-ui/react'

export default function useRefreshToken() {
  const { setAuth } = useAuth()
  const toast = useToast()

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
        toast({
          title: 'Sesión expirada',
          description: `Tu sesión expiró`,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
        setAuth({ isAuthenticated: false })
      }
    }
  }
  return refresh
}
