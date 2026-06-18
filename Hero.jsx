import { Link } from 'react-router-dom'
import { backdropUrl, BACKDROP_SIZES } from '../services/tmdb'
import { truncate } from '../utils/format'
import { HeroSkeleton } from './Skeletons'
import './Hero.css'

export default function Hero({ movie, loading }) {
  if (loading || !movie) return <HeroSkeleton />

  return (
    <section className="hero">
      <div className="hero-backdrop">
        <img
          src={backdropUrl(movie.backdrop_path, BACKDROP_SIZES.xl)}
          alt={movie.title}
          fetchpriority="high"
        />
        <div className="hero-gradient" />
      </div>

      <div className="container hero-content fade-in">
        <span className="hero-tag">🔥 Trending Now</span>
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-overview">{truncate(movie.overview, 180)}</p>
        <div className="hero-actions">
          <Link to={`/movie/${movie.id}`} className="btn btn-primary">
            ▶ View Details
          </Link>
          <Link to="/moods" className="btn btn-ghost">
            Browse Moods
          </Link>
        </div>
      </div>
    </section>
  )
}
