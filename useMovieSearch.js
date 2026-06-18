import { useState, useEffect, useRef } from 'react'
import { searchMovies } from '../services/tmdb'

export function useMovieSearch(query, delay = 400) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const requestId = useRef(0)

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    const id = ++requestId.current

    const timer = setTimeout(() => {
      searchMovies(trimmed)
        .then((res) => {
          if (requestId.current === id) {
            setResults(res.results || [])
            setLoading(false)
          }
        })
        .catch((err) => {
          if (requestId.current === id) {
            setError(err)
            setLoading(false)
          }
        })
    }, delay)

    return () => clearTimeout(timer)
  }, [query, delay])

  return { results, loading, error }
}
