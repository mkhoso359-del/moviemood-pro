import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

const STORAGE_KEY = 'moviemood_favorites_v1'
const FavoritesContext = createContext(null)

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFromStorage)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // localStorage may be unavailable (private mode / quota) — fail silently
    }
  }, [favorites])

  const isFavorite = useCallback(
    (id) => favorites.some((m) => m.id === id),
    [favorites]
  )

  const addFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      const slim = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        addedAt: Date.now(),
      }
      return [slim, ...prev]
    })
  }, [])

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const toggleFavorite = useCallback(
    (movie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id)
      } else {
        addFavorite(movie)
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  )

  const value = useMemo(
    () => ({ favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }),
    [favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider')
  return ctx
}
