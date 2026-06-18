import { useParams, Link, Navigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { RowSkeleton } from '../components/Skeletons'
import { ErrorState, EmptyState } from '../components/States'
import { useAsync } from '../hooks/useAsync'
import { discoverMovies } from '../services/tmdb'
import { getMoodById } from '../utils/moods'
import './MoodResults.css'

export default function MoodResults() {
  const { moodId } = useParams()
  const mood = getMoodById(moodId)

  const { data, loading, error, refetch } = useAsync(
    () =>
      mood
        ? discoverMovies({
            genres: mood.genres.join(','),
            sortBy: mood.sortBy,
            minRating: mood.minRating,
          })
        : Promise.resolve({ results: [] }),
    [moodId]
  )

  if (!mood) return <Navigate to="/moods" replace />

  return (
    <div className="page">
      <div className="container mood-results-page">
        <Link to="/moods" className="mood-results-back">
          ← All Moods
        </Link>

        <div className="mood-results-header" style={{ '--mood-color': mood.color }}>
          <span className="mood-results-emoji">{mood.emoji}</span>
          <div>
            <h1 className="mood-results-title">{mood.label}</h1>
            <p className="mood-results-desc">{mood.description}</p>
          </div>
        </div>

        {loading && <RowSkeleton count={10} />}

        {!loading && error && (
          <ErrorState message={`Couldn't load ${mood.label} movies.`} onRetry={refetch} />
        )}

        {!loading && !error && (!data?.results || data.results.length === 0) && (
          <EmptyState title="No movies found" message="Try another mood for now." />
        )}

        {!loading && !error && data?.results?.length > 0 && (
          <div className="mood-results-grid">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
