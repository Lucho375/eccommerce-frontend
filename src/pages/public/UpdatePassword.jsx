import { Navigate, useLocation } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { updatePasswordSchema } from '../../validations/formSchema'
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'

const initialValues = {
  password: '',
  confirmPassword: ''
}

export default function UpdatePassword() {
  const { resetPassword } = useAuth()
  const [passwordUpdated, setPasswordUpdated] = useState(false)

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')

  useEffect(() => {
    const timeout = setTimeout(() => setPasswordUpdated(false), 3000)
    return () => clearTimeout(timeout)
  }, [passwordUpdated])

  if (!token) return <Navigate to="/" />

  const onSubmit = async ({ password }) => {
    try {
      const { data } = await resetPassword(token, password)
      if (data.ok) setPasswordUpdated(true)
    } catch (error) {
      console.log(error)
    }
  }

  if (passwordUpdated)
    return (
      <section className="bg-slate-600 min-h-[200px] flex flex-col justify-center px-3 rounded-md">
        <h1 className="text-white">La contraseña fue cambiada con exito!</h1>
      </section>
    )

  return (
    <section>
      <h1 className="text-2xl text-center text-white mb-9">Restablecer contraseña</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(updatePasswordSchema)}
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-around min-h-[180px] w-96 bg-slate-600 p-8 rounded-md shadow-lg shadow-gray-700">
            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="mb-2 text-white">
                Nueva contraseña
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

            <div className="flex flex-col mb-4">
              <label htmlFor="confirmPassword" className="mb-2 text-white">
                Repetir nueva contraseña
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="px-3 py-1 rounded-md outline-none bg-slate-300"
              />
              <div className="min-h-[40px] mt-3">
                <ErrorMessage name="confirmPassword" component="span" className="text-red-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-2 text-white rounded-md cursor-pointer bg-slate-800 disabled:cursor-default disabled:opacity-60"
            >
              Cambiar contraseña
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}
