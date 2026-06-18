import { useEffect } from 'react'
import './TrailerModal.css'

export default function TrailerModal({ videoKey, title, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="trailer-modal-backdrop fade-in" onClick={onClose}>
      <div
        className="trailer-modal glass"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} trailer`}
      >
        <button
          type="button"
          className="trailer-modal-close btn-icon"
          onClick={onClose}
          aria-label="Close trailer"
        >
          ✕
        </button>
        <div className="trailer-modal-frame">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            title={`${title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
