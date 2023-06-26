async function fetchCart(axiosPrivate, userId) {
  try {
    const { data } = await axiosPrivate.get(`/carts/${userId}`)
    return { id: data.payload.id, products: data.payload.products }
  } catch (error) {
    if (error.response.status === 404) {
      await createCart(axiosPrivate, userId)
      return { id: null, products: [] }
    }
    throw error
  }
}

async function createCart(axiosPrivate, userId) {
  await axiosPrivate.post(`/carts`, { userId })
}
