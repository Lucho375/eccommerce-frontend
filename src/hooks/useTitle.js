import { useEffect } from 'react'

export default function useTitle(title, dependencies) {
  if (!Array.isArray(dependencies)) {
    dependencies = []
  }

  useEffect(() => {
    document.title = title
  }, [...dependencies])
}
