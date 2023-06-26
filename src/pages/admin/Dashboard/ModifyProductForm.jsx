import { ErrorMessage, Field, Form, Formik } from 'formik'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export default function ModifyProductForm({
  id,
  title,
  category,
  description,
  price,
  stock,
  status,
  close,
  reloadProducts
}) {
  const initialValues = { title, category, description, price, stock, status }
  const axiosPrivate = useAxiosPrivate()

  const onSubmit = values => {
    try {
      axiosPrivate.put(`/products/${id}`, values)
      reloadProducts()
      close()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={toFormikValidationSchema(loginSchema)}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ isSubmitting, values }) => (
        <section className="w-full">
          <Form className="flex flex-col p-3 rounded-md w-96 bg-slate-600" noValidate>
            {Object.keys(initialValues).map(key => {
              return (
                <div className="flex flex-col" key={key}>
                  <label htmlFor={key} className="mb-2 text-white">
                    {key}
                  </label>
                  <Field type="text" id={key} name={key} className="px-3 py-1 rounded-md outline-none bg-slate-500" />
                  <div className="min-h-[40px]">
                    <ErrorMessage name={key} component="span" className="text-red-500" />
                  </div>
                </div>
              )
            })}

            <div className="flex justify-between max-w-[200px] items-center">
              <button
                type="submit"
                disabled={isSubmitting || JSON.stringify(values) === JSON.stringify(initialValues)}
                className="px-3 py-2 text-white rounded-md cursor-pointer bg-slate-800 disabled:cursor-default disabled:opacity-60"
              >
                Modificar producto
              </button>
            </div>
          </Form>
        </section>
      )}
    </Formik>
  )
}
