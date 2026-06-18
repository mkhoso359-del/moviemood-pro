import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import MovieCard from '../components/MovieCard'
import { RowSkeleton } from '../components/Skeletons'
import { ErrorState, EmptyState } from '../components/States'
import { useAsync } from '../hooks/useAsync'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { getTrending, getPopular, getTopRated } from '../services/tmdb'
import './Home.css'

export default function Home() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const trending = useAsync(() => getTrending('week'), [])
  const popular = useAsync(() => getPopular(), [])
  const topRated = useAsync(() => getTopRated(), [])
  const search = useMovieSearch(searchQuery)

  const heroMovie = useMemo(() => trending.data?.results?.[0], [trending.data])

  if (searchQuery) {
    return (
      <div className="page">
        <div className="container" style={{ paddingTop: 32 }}>
          <h2 className="section-title">Results for "{searchQuery}"</h2>

          {search.loading && <RowSkeleton count={8} />}

          {!search.loading && search.error && (
            <ErrorState message="Search failed. Please try again." />
          )}

          {!search.loading && !search.error && search.results.length === 0 && (
            <EmptyState
              title="No movies found"
              message="Try a different title, or browse moods instead."
            />
          )}

          {!search.loading && search.results.length > 0 && (
            <div className="home-search-grid">
              {search.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page home-page">
      <Hero movie={heroMovie} loading={trending.loading} />

      <div className="container home-rows">
        <MovieRow
          title="Trending This Week"
          movies={trending.data?.results}
          loading={trending.loading}
          error={trending.error}
          onRetry={trending.refetch}
        />
        <MovieRow
          title="Popular Movies"
          movies={popular.data?.results}
          loading={popular.loading}
          error={popular.error}
          onRetry={popular.refetch}
        />
        <MovieRow
          title="Top Rated"
          movies={topRated.data?.results}
          loading={topRated.loading}
          error={topRated.error}
          onRetry={topRated.refetch}
        />
      </div>
    </div>
  )
}
