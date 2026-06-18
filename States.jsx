import './States.css'

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-box glass fade-in">
      <span className="state-icon">⚠️</span>
      <p className="state-message">{message || 'Something went wrong. Please try again.'}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}

export function EmptyState({ icon = '🎬', title, message }) {
  return (
    <div className="state-box glass fade-in">
      <span className="state-icon">{icon}</span>
      {title && <h3 className="state-title">{title}</h3>}
      <p className="state-message">{message}</p>
    </div>
  )
}
