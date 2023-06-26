import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('Cart context must be inside a provider')
  return context
}
