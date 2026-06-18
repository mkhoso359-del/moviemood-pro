import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--red-primary)' }}>
          404
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
          This page doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
