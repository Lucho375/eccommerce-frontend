import { ErrorMessage, Field, Formik, Form } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { productSchema } from '../../../validations/products'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useToast } from '@chakra-ui/react'

const initialValues = {
  title: '',
  code: '',
  description: '',
  price: '',
  stock: '',
  category: ''
}

function AddProducts() {
  const axiosPrivate = useAxiosPrivate()
  const toast = useToast()
  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosPrivate.post('/products', values)
      if (response.status === 201) {
        resetForm()
        toast({
          title: 'Producto agregado',
          description: `${values.title} fue agregado correctamente!`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex flex-col items-center mt-10 mb-10">
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(productSchema)}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ isSubmitting }) => (
          <Form className="px-5 py-3 rounded-md shadow-lg w-80 bg-slate-600 shadow-gray-700" noValidate>
            <div className="flex flex-col mb-4">
              <label htmlFor="title" className="mb-2 text-white">
                Titulo del producto
              </label>
              <Field type="text" id="title" name="title" className="px-3 py-1 rounded-md outline-none bg-slate-400" />
              <div className="min-h-[40px] mt-3">
                <ErrorMessage name="title" component="span" className="text-red-500" />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="code" className="mb-2 text-white">
                Codigo del producto
              </label>
              <Field type="text" id="code" name="code" className="px-3 py-1 rounded-md outline-none bg-slate-400" />
              <div className="min-h-[40px] mt-3">
                <ErrorMessage name="code" component="span" className="text-red-500" />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="description" className="mb-2 text-white">
                Descripcion del producto
              </label>
              <Field
                type="text"
                id="description"
                name="description"
                className="px-3 py-1 rounded-md outline-none bg-slate-400"
              />
              <div className="min-h-[40px] mt-3">
                <ErrorMessage name="description" component="span" className="text-red-500" />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="price" className="mb-2 text-white">
                Precio del producto
              </label>
              <Field type="number" id="price" name="price" className="px-3 py-1 rounded-md outline-none bg-slate-400" />
              <div className="min-h-[40px] mt-3">
                <ErrorMessage name="price" component="span" className="text-red-500" />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="stock" className="mb-2 text-white">
                Stock
              </label>
              <Field type="number" id="stock" name="stock" className="px-3 py-1 rounded-md outline-none bg-slate-400" />
              <div className="min-h-[40px] mt-3">
                <ErrorMessage name="stock" component="span" className="text-red-500" />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="category" className="mb-2 text-white">
                Categoria del producto
              </label>
              <Field
                type="text"
                id="category"
                name="category"
                className="px-3 py-1 rounded-md outline-none bg-slate-400"
              />
              <div className="min-h-[40px] mt-3">
                <ErrorMessage name="category" component="span" className="text-red-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-2 text-white rounded-md cursor-pointer bg-slate-800 disabled:cursor-default disabled:opacity-60"
            >
              Agregar producto
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default AddProducts
