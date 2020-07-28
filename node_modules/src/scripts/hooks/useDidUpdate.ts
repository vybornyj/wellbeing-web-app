import { useEffect, useRef } from 'react'

export const useDidUpdate = (func, deps) => {
  const firstUpdate = useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
    } else {
      func()
    }
  }, deps)
}
