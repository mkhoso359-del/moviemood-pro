import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { EmptyState } from '../components/States'
import { useFavorites } from '../context/FavoritesContext'
import './Favorites.css'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="page">
      <div className="container favorites-page">
        <div className="favorites-header">
          <h1 className="favorites-title">Your Favorites</h1>
          <p className="favorites-subtitle">
            {favorites.length > 0
              ? `${favorites.length} movie${favorites.length === 1 ? '' : 's'} saved`
              : 'Movies you save will appear here'}
          </p>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            icon="🤍"
            title="No favorites yet"
            message="Tap the heart icon on any movie to save it here."
          />
        ) : (
          <div className="favorites-grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {favorites.length === 0 && (
          <div className="favorites-cta">
            <Link to="/moods" className="btn btn-primary">
              Discover Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
