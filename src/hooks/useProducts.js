import { useEffect, useRef, useState } from 'react'

export function useProducts(axiosInstance, path, dependencies) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [responseError, setResponseError] = useState(null)
  const isMountedRef = useRef()

  useEffect(() => {
    setLoading(true)
    isMountedRef.current = true
    const controller = new AbortController()
    const getProducts = async () => {
      try {
        const { data } = await axiosInstance(path, { signal: controller.signal })
        isMountedRef.current && setData(data?.payload)
      } catch (error) {
        console.log(error)
        setResponseError(error)
      } finally {
        await new Promise(res => setTimeout(res, 1000))
        setLoading(false)
      }
    }
    getProducts()

    return () => {
      isMountedRef.current = false
      controller.abort()
    }
  }, [...dependencies])

  return { data, loading, responseError }
}
