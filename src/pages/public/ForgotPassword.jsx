import { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { restorePasswordSchema } from '../../validations/formSchema'
import axios from '../../api/axios'

const initialValue = {
  email: ''
}

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState(false)

  const onSubmit = async email => {
    try {
      const { data } = await axios.post('/sessions/forgot-password', email)
      if (data.status === 'success') {
        setEmailSent(true)
        setTimeout(() => setEmailSent(false), 15000)
      }
    } catch (error) {
      setError(true)
      setTimeout(() => setError(false), 15000)
      console.log(error)
    }
  }

  if (error)
    return (
      <section className="bg-slate-600 min-h-[200px] flex flex-col justify-center px-3 rounded-md">
        <h1 className="text-white">Ocurrió un error, intenta mas tarde</h1>
      </section>
    )

  if (emailSent)
    return (
      <section className="bg-slate-600 min-h-[200px] flex flex-col justify-center px-3 rounded-md">
        <h1 className="text-white">Enviamos un email a tu correo electronico para restablecer tu contraseña</h1>
      </section>
    )

  return (
    <section>
      <h1>Restablecer contraseña</h1>
      <Formik
        initialValues={initialValue}
        validationSchema={toFormikValidationSchema(restorePasswordSchema)}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-around min-h-[200px] w-96 bg-slate-600 p-8 rounded-md shadow-lg shadow-gray-700">
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="text-white mb-2">
                Correo electrónico
              </label>
              <Field type="text" id="email" name="email" className="bg-slate-300 outline-none rounded-md px-3 py-1" />
              <div className="min-h-[40px] mt-3">
                <ErrorMessage name="email" component="span" className="text-red-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-800 text-white rounded-md px-3 py-2 cursor-pointer disabled:cursor-default disabled:opacity-60"
            >
              Restablecer contraseña
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}
