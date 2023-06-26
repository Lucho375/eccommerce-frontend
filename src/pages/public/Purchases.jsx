import { useEffect, useRef, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import { Box, Heading, List, ListIcon, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'

function Purchases() {
  const [purchases, setPurchases] = useState([])
  const { auth } = useAuth()

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getPurchases = async () => {
      try {
        const { data } = await axiosPrivate.get(`/tickets?purchaser=${auth?.user?.email}`)
        setPurchases(data.payload)
        console.log(data.payload)
      } catch (error) {
        console.error('Error al obtener las compras:', error)
      }
    }
    getPurchases()
  }, [])

  if (purchases.length < 1) return <h1 className="text-3xl text-white">Todavia no tenes compras</h1>

  return (
    <Box mt={5} mb={5} className="self-start">
      <Heading as="h1" mb={4} fontSize="2xl" fontWeight="bold" color="white">
        Mis compras
      </Heading>
      <List spacing={4} color="white">
        {purchases.map(purchase => (
          <ListItem key={purchase._id} p={4} border="1px" borderColor="gray.300" bg="gray.700" rounded="md">
            {/* <ListIcon as={MdCheckCircle} color="green.500" /> */}
            <Text>
              <strong>Producto:</strong> {purchase.products[0]._id.title}
            </Text>
            <Text>
              <strong>Precio de la compra:</strong> ${purchase.amount}
            </Text>
            <Text>
              <strong>Precio por unidad:</strong> ${purchase.products[0].price}
            </Text>
            <Text>
              <strong>Unidades:</strong> {purchase.products[0].quantity}
            </Text>
            <Text>
              <strong>Codigo de la compra:</strong> {purchase.code}
            </Text>
            <Text>
              <strong>Fecha de la compra:</strong> {new Date(purchase.purchase_datetime).toLocaleString()}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Purchases
