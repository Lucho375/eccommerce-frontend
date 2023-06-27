import { createContext, useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'
import { useToast } from '@chakra-ui/react'
export const CartContext = createContext()

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const toast = useToast()

  useEffect(() => {
    const getCart = async () => {
      try {
        const { data } = await axiosPrivate.get(`/carts/${auth.user.id}`)
        setCart({ id: data.payload.id, products: data.payload.products })
      } catch (error) {
        if (error.response.status === 404) {
          const { data } = await axiosPrivate.post(`/carts`, { user: auth.user.id }) // localStorage
          setCart({ id: data.payload._id, products: [] })
        }
      }
    }
    if (auth.isAuthenticated) {
      getCart()
    }
  }, [auth])

  const addToCart = async id => {
    try {
      const response = await axiosPrivate.post(`/carts/${cart.id}/products/${id}`)
      if (response.status === 200) {
        setCart(prev => ({
          ...prev,
          products: response.data.payload.products
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeFromCart = async productId => {
    try {
      const response = await axiosPrivate.delete(`/carts/${cart.id}/products/${productId}`)
      setCart(prev => ({
        ...prev,
        products: response.data.payload.products
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      const response = await axiosPrivate.put(`/carts/${cart.id}/products/${productId}`, { quantity: newQuantity })
      setCart(prev => ({
        ...prev,
        products: response.data.payload.products
      }))
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const clearCart = async () => {
    try {
      const response = await axiosPrivate.delete(`/carts/${cart.id}`)
      if (response.status === 200) {
        setCart(prev => ({ ...prev, products: [] }))
        toast({
          title: 'Carrito vaciado correctamente',
          status: 'info',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkout = async () => {
    try {
      const response = await axiosPrivate.post(`/carts/${cart.id}/purchase`)
      console.log(response)
      if (response.status === 200) {
        setCart(prev => ({ ...prev, products: [] }))
        toast({
          title: 'Carrito comprado',
          description: 'Estamos enviando tus productos',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast({
          title: 'Productos sin stock',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
      }
      console.log(error.response.data)
    }
  }

  const getTotalPriceInCart = async () => {}

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateProductQuantity,
        checkout,
        getTotalPriceInCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
