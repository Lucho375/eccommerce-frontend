import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema } from '../../validations/formSchema'
import useAuth from '../../hooks/useAuth'
import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Register = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [error, setError] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => setError(null), 3000)
    return () => clearTimeout(timeout)
  }, [error])

  const onSubmit = async (values, resetForm) => {
    try {
      const { confirmPassword, ...rest } = values
      await signup({ ...rest })
      resetForm()
      toast({
        duration: 2000,
        position: 'top-right',
        description: 'Cuenta creada exitosamente',
        status: 'success',
        onCloseComplete: () => navigate('/login')
      })
    } catch (error) {
      setError(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(registerSchema)}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col justify-around p-8 rounded-md shadow-lg w-96 bg-slate-600 shadow-gray-700">
          <div
            className={`min-h-[40px] mt-3  ${
              error ? 'opacity-100  transition-opacity duration-200 ease-in-out' : 'opacity-0'
            }`}
          >
            {error && <span className="mb-5 text-red-500">{error}</span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="mb-2 text-white">
              Nombre
            </label>
            <Field
              type="text"
              id="firstname"
              name="firstname"
              className="px-3 py-1 rounded-md outline-none bg-slate-300"
            />
            <div className="min-h-[40px]">
              <ErrorMessage name="firstname" component="span" className="text-red-500" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastname" className="mb-2 text-white">
              Apellido
            </label>
            <Field
              type="text"
              id="lastname"
              name="lastname"
              className="px-3 py-1 rounded-md outline-none bg-slate-300"
            />
            <div className="min-h-[40px]">
              <ErrorMessage name="lastname" component="span" className="text-red-500" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-white">
              Correo electrónico
            </label>
            <Field type="text" id="email" name="email" className="px-3 py-1 rounded-md outline-none bg-slate-300" />
            <div className="min-h-[40px]">
              <ErrorMessage name="email" component="span" className="text-red-500" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-white">
              Contraseña
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="px-3 py-1 rounded-md outline-none bg-slate-300"
            />
            <div className="min-h-[40px]">
              <ErrorMessage name="password" component="span" className="text-red-500" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2 text-white">
              Confirmar contraseña
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="px-3 py-1 rounded-md outline-none bg-slate-300"
            />
            <div className="min-h-[40px]">
              <ErrorMessage name="confirmPassword" component="span" className="text-red-500" />
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="px-3 py-2 text-white rounded-md cursor-pointer bg-slate-800 disabled:opacity-70 disabled:cursor-default"
          >
            Registrarse
          </button>

          <span className="mt-3 text-white">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-slate-300">
              Iniciar sesión
            </Link>
          </span>
        </Form>
      )}
    </Formik>
  )
}

export default Register
