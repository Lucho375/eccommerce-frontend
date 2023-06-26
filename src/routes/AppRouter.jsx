import { Suspense, lazy } from 'react'
import { Spinner } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import Login from '../pages/public/Login'
import Register from '../pages/public/Register'
import ProtectedRoute from './ProtectedRoute'
import ForgotPassword from '../pages/public/ForgotPassword'
import UpdatePassword from '../pages/public/UpdatePassword'
import ProductsList from '../pages/public/ProductsList'
import Cart from '../pages/public/Cart'
import ErrorBoundary from '../components/global/ErrorBoundary'
import Home from '../pages/public/Home'
import Purchases from '../pages/public/Purchases'

const AddProducts = lazy(() => import('../pages/admin/Dashboard/AddProducts'))
const ModifyProducts = lazy(() => import('../pages/admin/Dashboard/ModifyProducts'))
const Profile = lazy(() => import('../pages/public/Profile'))
const Dashboard = lazy(() => import('../pages/admin/Dashboard/Dashboard'))
const NotFound = lazy(() => import('../pages/public/NotFound'))

export default function AppRouter() {
  return (
    <ErrorBoundary
      fallback={
        <>
          <h1 className="p-10 text-3xl text-white rounded bg-slate-600">Algo ocurrio</h1>
        </>
      }
    >
      <Suspense fallback={<Spinner size="xl" color="white" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<UpdatePassword />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/my_purchases" element={<Purchases />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-products" element={<AddProducts />} />
              <Route path="modify-products" element={<ModifyProducts />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
