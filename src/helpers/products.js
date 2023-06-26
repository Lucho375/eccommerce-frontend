export const sort = {
  CONDITION: {
    PRICE: 'price',
    NAME: 'name'
  },
  ORDER: {
    ASCENDING: 'asc',
    DESCENDING: 'desc'
  }
}

export function availableProducts(arr) {
  return arr.filter(prod => prod.status)
}

export function filterByCategory(arr, category) {
  return arr.filter(prod => prod.category === category)
}

export function sortProducts(array, condition, order) {
  if (condition === sort.CONDITION.PRICE)
    return [...array].sort((a, b) => (order === sort.ORDER.ASCENDING ? a.price - b.price : b.price - a.price))

  if (condition === sort.CONDITION.NAME)
    return [...array].sort((a, b) =>
      order === sort.ORDER.ASCENDING ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    )
}
