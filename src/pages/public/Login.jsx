import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { loginSchema } from '../../validations/formSchema'
import useAuth from '../../hooks/useAuth'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const initialValues = {
  email: '',
  password: ''
}

function Login() {
  const { auth, login } = useAuth()
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    const clearError = setTimeout(() => setError(null), 5000)
    return () => clearTimeout(clearError)
  }, [error])

  if (auth?.isAuthenticated) return <Navigate to={'/'} />

  const onSubmit = async (userInfo, { resetForm, setErrors }) => {
    try {
      await login(userInfo)
      resetForm()
      navigate(from, { replace: true })
    } catch (error) {
      if (error.response.status === 401) {
        return setError('Email o contraseña invalidos')
      }
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data[0])
      }
      if (error.response.status === 500) {
        setError('Ocurrió un error, intente en unos minutos')
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(loginSchema)}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ isSubmitting }) => (
        <Form
          className="flex flex-col min-h-[400px] w-96 bg-slate-600 p-8 rounded-md shadow-lg shadow-gray-700"
          noValidate
        >
          <div
            className={`min-h-[40px] mt-3  ${
              error ? 'opacity-100  transition-opacity duration-200 ease-in-out' : 'opacity-0'
            }`}
          >
            {error && <span className="mb-5 text-red-500">{error}</span>}
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2 text-white">
              Correo electrónico
            </label>
            <Field type="email" id="email" name="email" className="px-3 py-1 rounded-md outline-none bg-slate-300" />
            <div className="min-h-[40px] mt-3">
              <ErrorMessage name="email" component="span" className="text-red-500" />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-2 text-white">
              Contraseña
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="px-3 py-1 rounded-md outline-none bg-slate-300"
            />
            <div className="min-h-[40px] mt-3">
              <ErrorMessage name="password" component="span" className="text-red-500" />
            </div>
          </div>

          <Link
            to="/forgot-password"
            className="py-2 mb-3 text-center text-white rounded-md hover:text-slate-300 bg-slate-800"
          >
            Olvidaste tu contraseña?
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-3 py-2 text-white rounded-md cursor-pointer bg-slate-800 disabled:cursor-default disabled:opacity-60"
          >
            Iniciar sesión
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default Login
