import './Skeletons.css'

export function CardSkeleton() {
  return (
    <div className="card-skeleton">
      <div className="skeleton card-skeleton-poster" />
      <div className="skeleton card-skeleton-line" style={{ width: '80%' }} />
      <div className="skeleton card-skeleton-line" style={{ width: '40%' }} />
    </div>
  )
}

export function RowSkeleton({ count = 6 }) {
  return (
    <div className="row-skeleton">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return <div className="skeleton hero-skeleton" />
}

export function DetailsSkeleton() {
  return (
    <div className="details-skeleton">
      <div className="skeleton details-skeleton-backdrop" />
      <div className="details-skeleton-body container">
        <div className="skeleton details-skeleton-poster" />
        <div className="details-skeleton-text">
          <div className="skeleton details-skeleton-line" style={{ width: '60%', height: 32 }} />
          <div className="skeleton details-skeleton-line" style={{ width: '40%' }} />
          <div className="skeleton details-skeleton-line" style={{ width: '90%' }} />
          <div className="skeleton details-skeleton-line" style={{ width: '85%' }} />
          <div className="skeleton details-skeleton-line" style={{ width: '70%' }} />
        </div>
      </div>
    </div>
  )
}
