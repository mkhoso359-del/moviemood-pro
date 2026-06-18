import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import LazyImage from '../components/LazyImage'
import TrailerModal from '../components/TrailerModal'
import MovieRow from '../components/MovieRow'
import { DetailsSkeleton } from '../components/Skeletons'
import { ErrorState } from '../components/States'
import { useAsync } from '../hooks/useAsync'
import { useFavorites } from '../context/FavoritesContext'
import {
  getMovieDetails,
  getMovieVideos,
  getSimilarMovies,
  posterUrl,
  backdropUrl,
  POSTER_SIZES,
  BACKDROP_SIZES,
} from '../services/tmdb'
import { formatRuntime, formatDate, formatRating } from '../utils/format'
import './MovieDetails.css'

export default function MovieDetails() {
  const { id } = useParams()
  const movieId = Number(id)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()

  const details = useAsync(() => getMovieDetails(movieId), [movieId])
  const videos = useAsync(() => getMovieVideos(movieId), [movieId])
  const similar = useAsync(() => getSimilarMovies(movieId), [movieId])

  const trailer = useMemo(() => {
    const results = videos.data?.results || []
    return (
      results.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ||
      results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
      results.find((v) => v.site === 'YouTube')
    )
  }, [videos.data])

  if (details.loading) {
    return (
      <div className="page">
        <DetailsSkeleton />
      </div>
    )
  }

  if (details.error) {
    return (
      <div className="page">
        <div className="container" style={{ paddingTop: 60 }}>
          <ErrorState
            message="Couldn't load this movie. It may not exist or there was a network issue."
            onRetry={details.refetch}
          />
        </div>
      </div>
    )
  }

  const movie = details.data
  if (!movie) return null
  const fav = isFavorite(movie.id)

  return (
    <div className="page movie-details-page">
      <div className="movie-details-backdrop">
        <LazyImage
          src={backdropUrl(movie.backdrop_path, BACKDROP_SIZES.xl)}
          alt={movie.title}
        />
        <div className="movie-details-backdrop-gradient" />
      </div>

      <div className="container movie-details-body">
        <div className="movie-details-poster glass">
          <LazyImage src={posterUrl(movie.poster_path, POSTER_SIZES.lg)} alt={movie.title} />
        </div>

        <div className="movie-details-info fade-in">
          <h1 className="movie-details-title">{movie.title}</h1>

          <div className="movie-details-meta">
            <span className="movie-details-rating">★ {formatRating(movie.vote_average)}</span>
            <span>{formatDate(movie.release_date)}</span>
            <span>{formatRuntime(movie.runtime)}</span>
          </div>

          {movie.genres?.length > 0 && (
            <div className="movie-details-genres">
              {movie.genres.map((g) => (
                <span key={g.id} className="movie-details-genre-pill">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          <p className="movie-details-overview">{movie.overview || 'No overview available.'}</p>

          <div className="movie-details-actions">
            {trailer && (
              <button type="button" className="btn btn-primary" onClick={() => setTrailerOpen(true)}>
                ▶ Watch Trailer
              </button>
            )}
            <button
              type="button"
              className={`btn btn-ghost ${fav ? 'is-fav' : ''}`}
              onClick={() => toggleFavorite(movie)}
            >
              {fav ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <MovieRow
          title="More Like This"
          movies={similar.data?.results}
          loading={similar.loading}
          error={similar.error}
          onRetry={similar.refetch}
        />
      </div>

      {trailerOpen && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          title={movie.title}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </div>
  )
}
