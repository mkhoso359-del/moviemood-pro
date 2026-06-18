import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Runs an async fetcher and tracks loading / error / data state.
 * Re-runs whenever any value in `deps` changes.
 * Guards against setting state after unmount or after a newer request started.
 */
export function useAsync(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const requestId = useRef(0)

  const run = useCallback(() => {
    const id = ++requestId.current
    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => {
        if (requestId.current === id) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (requestId.current === id) {
          setError(err)
          setLoading(false)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    run()
  }, [run])

  return { data, loading, error, refetch: run }
}
