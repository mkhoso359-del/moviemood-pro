import { Link } from 'react-router-dom'
import LazyImage from './LazyImage'
import { posterUrl, POSTER_SIZES } from '../services/tmdb'
import { formatRating, formatYear } from '../utils/format'
import { useFavorites } from '../context/FavoritesContext'
import './MovieCard.css'

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(movie.id)

  function handleFavoriteClick(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card glass" aria-label={movie.title}>
      <div className="movie-card-poster">
        <LazyImage
          src={posterUrl(movie.poster_path, POSTER_SIZES.md)}
          alt={movie.title}
        />
        <button
          type="button"
          className={`movie-card-fav btn-icon ${fav ? 'is-active' : ''}`}
          onClick={handleFavoriteClick}
          aria-pressed={fav}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {fav ? '♥' : '♡'}
        </button>
        <div className="movie-card-rating">
          <span>★</span> {formatRating(movie.vote_average)}
        </div>
        <div className="movie-card-overlay">
          <span className="movie-card-play">▶ View Details</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <span className="movie-card-year">{formatYear(movie.release_date)}</span>
      </div>
    </Link>
  )
}
