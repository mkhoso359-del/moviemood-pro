import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-logo">
          Movie<span>Mood</span> Pro
        </span>
        <p className="footer-text">
          Movie data and images provided by TMDB. This product uses the TMDB API but is not
          endorsed or certified by TMDB.
        </p>
        <p className="footer-copy">© {new Date().getFullYear()} MovieMood Pro. Built for film lovers.</p>
      </div>
    </footer>
  )
}
