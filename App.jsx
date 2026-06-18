import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Moods from './pages/Moods'
import MoodResults from './pages/MoodResults'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Header />
      <ErrorBoundary key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/moods" element={<Moods />} />
          <Route path="/moods/:moodId" element={<MoodResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </>
  )
}
