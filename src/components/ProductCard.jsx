import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'
import { useToast } from '@chakra-ui/react'

export default function ProductCard({ id, category, description, price, stock, thumbnail, title }) {
  const { addToCart } = useCart()
  const toast = useToast()

  const handleAddToCart = async (id, title) => {
    const test = await addToCart(id)
    console.log(test)
    toast({
      title: 'Producto agregado al carrito',
      description: `${title} agregado al carrito`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    })
  }

  return (
    <article className="p-6 rounded-lg shadow-md bg-test4">
      <header>
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      </header>
      <main>
        <p className="mb-4 text-black">{category}</p>
        <p className="text-black">{description}</p>
        <Link to={`/product/${id}`}>
          <img src={thumbnail} alt={title} />{' '}
        </Link>
      </main>
      <footer className="flex items-center justify-between mt-5">
        <p className="font-semibold text-green-600">${price}</p>
        <button
          className="px-4 py-2 font-semibold text-white rounded bg-test hover:bg-green-700"
          onClick={() => handleAddToCart(id, title)}
        >
          Agregar al carrito
        </button>
      </footer>
    </article>
  )
}
