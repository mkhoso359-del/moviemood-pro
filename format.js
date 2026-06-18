export function formatRuntime(minutes) {
  if (!minutes || minutes <= 0) return 'N/A'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function formatDate(dateStr) {
  if (!dateStr) return 'Unknown'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export function formatYear(dateStr) {
  if (!dateStr) return ''
  return dateStr.slice(0, 4)
}

export function formatRating(rating) {
  if (rating === undefined || rating === null) return 'N/A'
  return rating.toFixed(1)
}

export function truncate(text, max = 160) {
  if (!text) return ''
  if (text.length <= max) return text
  return `${text.slice(0, max).trim()}…`
}

export function debounce(fn, delay = 400) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
