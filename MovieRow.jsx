import { useRef } from 'react'
import MovieCard from './MovieCard'
import { RowSkeleton } from './Skeletons'
import { ErrorState, EmptyState } from './States'
import './MovieRow.css'

export default function MovieRow({ title, movies, loading, error, onRetry }) {
  const scrollerRef = useRef(null)

  function scrollBy(amount) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="movie-row">
      <div className="movie-row-header">
        <h2 className="section-title">{title}</h2>
        {!loading && !error && movies?.length > 0 && (
          <div className="movie-row-arrows">
            <button
              type="button"
              className="btn-icon"
              onClick={() => scrollBy(-600)}
              aria-label={`Scroll ${title} left`}
            >
              ‹
            </button>
            <button
              type="button"
              className="btn-icon"
              onClick={() => scrollBy(600)}
              aria-label={`Scroll ${title} right`}
            >
              ›
            </button>
          </div>
        )}
      </div>

      {loading && <RowSkeleton count={6} />}

      {!loading && error && (
        <ErrorState message={`Couldn't load ${title}.`} onRetry={onRetry} />
      )}

      {!loading && !error && (!movies || movies.length === 0) && (
        <EmptyState title="Nothing here yet" message="No movies found for this row." />
      )}

      {!loading && !error && movies && movies.length > 0 && (
        <div className="movie-row-scroller" ref={scrollerRef}>
          {movies.map((movie) => (
            <div className="movie-row-item" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
