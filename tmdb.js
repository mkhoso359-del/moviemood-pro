const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_API_TOKEN

export const IMAGE_BASE = 'https://image.tmdb.org/t/p'
export const POSTER_SIZES = { sm: 'w185', md: 'w342', lg: 'w500', xl: 'w780' }
export const BACKDROP_SIZES = { sm: 'w300', md: 'w780', lg: 'w1280', xl: 'original' }

export function posterUrl(path, size = POSTER_SIZES.md) {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

export function backdropUrl(path, size = BACKDROP_SIZES.lg) {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

class TMDBError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'TMDBError'
    this.status = status
  }
}

async function request(endpoint, params = {}) {
  if (!TOKEN || TOKEN === 'your_tmdb_v4_read_access_token_here') {
    throw new TMDBError(
      'Missing TMDB API token. Add VITE_TMDB_API_TOKEN to your .env file (see .env.example).',
      401
    )
  }

  const url = new URL(`${BASE_URL}${endpoint}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  let response
  try {
    response = await fetch(url.toString(), {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    })
  } catch (networkErr) {
    throw new TMDBError('Network error — check your internet connection.', 0)
  }

  if (!response.ok) {
    let message = `TMDB request failed (${response.status})`
    try {
      const body = await response.json()
      if (body?.status_message) message = body.status_message
    } catch {
      // ignore parse failure, use default message
    }
    throw new TMDBError(message, response.status)
  }

  return response.json()
}

// ---- Discovery / lists ----
export const getTrending = (timeWindow = 'week', page = 1) =>
  request(`/trending/movie/${timeWindow}`, { page })

export const getPopular = (page = 1) => request('/movie/popular', { page })

export const getTopRated = (page = 1) => request('/movie/top_rated', { page })

export const getNowPlaying = (page = 1) => request('/movie/now_playing', { page })

export const getUpcoming = (page = 1) => request('/movie/upcoming', { page })

// ---- Detail endpoints ----
export const getMovieDetails = (id) =>
  request(`/movie/${id}`, { append_to_response: 'credits' })

export const getMovieVideos = (id) => request(`/movie/${id}/videos`)

export const getMovieCredits = (id) => request(`/movie/${id}/credits`)

export const getSimilarMovies = (id, page = 1) =>
  request(`/movie/${id}/similar`, { page })

// ---- Genres ----
export const getGenres = () => request('/genre/movie/list')

// ---- Discover (used for mood-based filtering) ----
export const discoverMovies = ({
  genres,
  sortBy = 'popularity.desc',
  minVoteCount = 100,
  page = 1,
  minRating,
  maxRating,
} = {}) =>
  request('/discover/movie', {
    with_genres: genres,
    sort_by: sortBy,
    'vote_count.gte': minVoteCount,
    'vote_average.gte': minRating,
    'vote_average.lte': maxRating,
    page,
  })

// ---- Search ----
export const searchMovies = (query, page = 1) =>
  request('/search/movie', { query, page, include_adult: false })

export { TMDBError }
