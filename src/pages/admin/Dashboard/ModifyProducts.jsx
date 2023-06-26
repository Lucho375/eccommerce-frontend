import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'

import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import Modal from '../../../components/global/Modal'
import ModifyProductForm from './ModifyProductForm'
import ProductsTable from './ProductsTable'
import { useProducts } from '../../../hooks/useProducts'

function ModifyProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [reloadProducts, setReloadProducts] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const { data: products, loading } = useProducts(axiosPrivate.get, '/products', [reloadProducts])

  const handleProductStatus = async (id, status) => {
    try {
      await axiosPrivate.put(`/products/${id}`, { status: !status })
      setReloadProducts(!reloadProducts)
    } catch (error) {
      console.log(error)
    }
  }

  const openModal = product => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  const updateProducts = () => {
    setReloadProducts(!reloadProducts)
  }

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <Spinner size="xl" color="white" />
      </div>
    )

  if (products.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <h2 className="p-10 text-3xl text-white rounded-md bg-slate-500">No existen productos todavia.</h2>
      </div>
    )

  return (
    <section className="mb-5">
      <div className="flex justify-center">
        <ProductsTable products={products} openModal={openModal} handleProductStatus={handleProductStatus} />
      </div>

      <Modal isOpen={selectedProduct !== null} onClose={() => closeModal()}>
        <ModifyProductForm {...selectedProduct} close={() => closeModal()} reloadProducts={updateProducts} />
      </Modal>
    </section>
  )
}

export default ModifyProducts
