import MoodCard from '../components/MoodCard'
import { MOODS } from '../utils/moods'
import './Moods.css'

export default function Moods() {
  return (
    <div className="page">
      <div className="container moods-page">
        <div className="moods-header">
          <h1 className="moods-title">What's your mood?</h1>
          <p className="moods-subtitle">Pick a feeling, we'll find the perfect movie.</p>
        </div>

        <div className="moods-grid">
          {MOODS.map((mood) => (
            <MoodCard key={mood.id} mood={mood} />
          ))}
        </div>
      </div>
    </div>
  )
}
