import ProductCard from '../../components/ProductCard'
import { Spinner } from '@chakra-ui/react'
import { useProducts } from '../../hooks/useProducts'
import { availableProducts } from '../../helpers/products'
import useTitle from '../../hooks/useTitle'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function ProductsList() {
  const axiosPrivate = useAxiosPrivate()
  const { data, loading } = useProducts(axiosPrivate.get, '/products', [])
  const products = availableProducts(data)
  useTitle('Productos')

  if (loading) return <Spinner size="xl" color="white" />
  if (products.length === 0) return <h1 className="text-3xl text-center text-white">No hay productos</h1>

  return (
    <section className="grid max-w-6xl grid-cols-1 gap-4 px-4 mx-auto mt-20 mb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map(prod => (
        <ProductCard {...prod} key={prod.id} />
      ))}
    </section>
  )
}

export default ProductsList
