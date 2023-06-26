import axios, { axiosPrivate } from '../axios'

export const Signup = async userData => await axios.post('/sessions/signup', userData)
export const ForgotPassword = async email => await axios.post('/sessions/forgot-password', email)

export const Login = async credentials => await axiosPrivate.post('/sessions/login', credentials)
export const Logout = async () => await axiosPrivate.get('/sessions/logout')
export const ResetPassword = async (token, password) =>
  await axiosPrivate.post('/sessions/reset-password', { token, password })
