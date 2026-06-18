import { Link } from 'react-router-dom'
import './MoodCard.css'

export default function MoodCard({ mood }) {
  return (
    <Link
      to={`/moods/${mood.id}`}
      className="mood-card glass"
      style={{ '--mood-color': mood.color }}
    >
      <span className="mood-card-emoji">{mood.emoji}</span>
      <h3 className="mood-card-label">{mood.label}</h3>
      <p className="mood-card-desc">{mood.description}</p>
    </Link>
  )
}
