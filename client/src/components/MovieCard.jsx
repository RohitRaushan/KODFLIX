const IMAGE_BASE = 'https://image.tmdb.org/t/p/original'

function MovieCard({ movie, isOriginal }) {
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE}${isOriginal ? movie.poster_path : movie.backdrop_path || movie.poster_path}`
    : null

  if (!imageUrl) return null

  return (
    <div className="movie-card">
      <img
        src={imageUrl}
        alt={movie.title || movie.name}
        loading="lazy"
      />
      <div className="movie-card-overlay">
        <div className="movie-card-title">{movie.title || movie.name}</div>
        <div className="movie-card-rating">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#46d369">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          {movie.vote_average?.toFixed(1)}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
