import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/moods', label: 'Moods' },
  { to: '/favorites', label: 'Favorites' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const searchInputRef = useRef(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  function handleSearchSubmit(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`)
      setSearchOpen(false)
      setMenuOpen(false)
    }
  }

  return (
    <header className={`header ${scrolled ? 'header-scrolled glass' : ''}`}>
      <div className="container header-inner">
        <div className="header-left">
          <NavLink to="/" className="header-logo">
            Movie<span>Mood</span>
          </NavLink>
          <nav className={`header-nav ${menuOpen ? 'is-open' : ''}`}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `header-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="header-right">
          <form
            className={`header-search ${searchOpen ? 'is-open' : ''}`}
            onSubmit={handleSearchSubmit}
            role="search"
          >
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search movies"
            />
            <button
              type="button"
              className="btn-icon header-search-toggle"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Toggle search"
            >
              {searchOpen ? '✕' : '🔍'}
            </button>
          </form>

          <button
            type="button"
            className="header-burger"
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
