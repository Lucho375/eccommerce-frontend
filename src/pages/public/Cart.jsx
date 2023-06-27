import { Box, Button, Heading, List, ListItem, IconButton, ButtonGroup } from '@chakra-ui/react'
import { MdDeleteOutline, MdAdd, MdRemove } from 'react-icons/md'
import useCart from '../../hooks/useCart'
import useTitle from '../../hooks/useTitle'
import { Link } from 'react-router-dom'

function Cart() {
  const { cart, clearCart, removeFromCart, updateProductQuantity, checkout } = useCart()
  useTitle('Carrito')

  return (
    <Box mt={20} p={4} bg="gray.800" color="white" borderRadius="md" className="self-start">
      <Heading as="h1" fontSize="2xl" mb={4}>
        Carrito
      </Heading>
      {cart.products?.length >= 1 ? (
        <>
          <List spacing={4}>
            {cart.products.map(prod => (
              <ListItem
                key={prod._id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={3}
                borderRadius="md"
                bg="gray.700"
              >
                <Box flex="1" mr={3}>
                  {JSON.stringify(prod, null, 2)}
                </Box>
                <IconButton
                  aria-label="Eliminar Producto"
                  colorScheme="red"
                  size="sm"
                  icon={<MdDeleteOutline />}
                  onClick={() => removeFromCart(prod._id)}
                  mr={2}
                />
                <IconButton
                  aria-label="Sumar Cantidad"
                  colorScheme="blue"
                  size="sm"
                  icon={<MdAdd />}
                  isDisabled={prod.stock === prod.quantity}
                  onClick={() => updateProductQuantity(prod._id, prod.quantity + 1)}
                  mr={2}
                />
                <Box fontWeight="bold">{prod.quantity}</Box>
                <IconButton
                  aria-label="Restar Cantidad"
                  colorScheme="blue"
                  size="sm"
                  icon={<MdRemove />}
                  onClick={() => updateProductQuantity(prod._id, prod.quantity - 1)}
                  isDisabled={prod.quantity === 1}
                />
              </ListItem>
            ))}
          </List>
          <ButtonGroup spacing="4" colorScheme="blue" marginTop="5">
            <Button onClick={clearCart}>Vaciar carrito</Button>
            <Button onClick={checkout}>Finalizar compra</Button>
          </ButtonGroup>
        </>
      ) : (
        <Box mt={4} textAlign="center" p={5} maxWidth="2xl" mx="auto" bg="gray.700" borderRadius="md" width="xl">
          <Heading as="h2" fontSize="md" mb={5} color="white">
            No hay productos en el carrito
          </Heading>
          <Link
            to="/products"
            className="px-4 py-2 text-blue-500 underline transition-all bg-gray-600 rounded-md hover:bg-gray-500"
          >
            ¡Empieza a comprar!
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default Cart
