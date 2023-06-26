import { Navigate, Outlet, Route, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function ProtectedRoute() {
  const { auth } = useAuth()
  const location = useLocation()
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}
