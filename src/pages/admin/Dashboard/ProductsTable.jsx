import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import Button from '../../../components/global/Button'
import { AiOutlineCheck } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

export default function ProductsTable({ products, openModal, handleProductStatus }) {
  return (
    <>
      <TableContainer>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th color="white">Nombre</Th>
              <Th color="white">Stock</Th>
              <Th color="white">Precio</Th>
              <Th></Th>
              <Th color="white">Estado</Th>
              <Th color="white">Activar/Desactivar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map(prod => (
              <Tr key={prod.id} className="bg-test">
                <Td className="pl-11">{prod?.title}</Td>
                <Td className="pl-11">{prod?.stock}</Td>
                <Td className="pl-11">${prod?.price}</Td>
                <Td className="pl-11">
                  <button onClick={() => openModal(prod)}>
                    <FiEdit className="transition-all hover:text-green-600" />
                  </button>
                </Td>
                <Td className={`${prod?.status ? 'text-green-700' : 'text-red-700'} pl-11`}>
                  <Button onClick={() => handleProductStatus(prod.id, prod.status)}>
                    {prod?.status ? 'Activado' : 'Desactivado'}
                  </Button>
                </Td>
                <Td className="pl-11">
                  <Button
                    onClick={() => handleProductStatus(prod.id, prod.status)}
                    className={`${
                      prod.status ? 'hover:text-red-700' : 'hover:text-green-700'
                    } flex justify-center mx-auto transition-all ease-in-out`}
                  >
                    {prod.status ? <TiDelete /> : <AiOutlineCheck />}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
