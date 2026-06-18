import { useState } from 'react'
import './LazyImage.css'

export default function LazyImage({ src, alt, className = '', fallback = null, style }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return (
      <div className={`lazy-image-fallback ${className}`} style={style} aria-label={alt}>
        {fallback || <span>🎬</span>}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`lazy-image ${loaded ? 'is-loaded' : 'is-loading'} ${className}`}
      style={style}
      onLoad={() => setLoaded(true)}
      onError={() => setErrored(true)}
    />
  )
}
