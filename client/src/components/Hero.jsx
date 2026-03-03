const IMAGE_BASE = 'https://image.tmdb.org/t/p/original'

function Hero({ movie }) {
  if (!movie) return null

  const imageUrl = movie.backdrop_path
    ? `${IMAGE_BASE}${movie.backdrop_path}`
    : movie.poster_path
      ? `${IMAGE_BASE}${movie.poster_path}`
      : null

  return (
    <div className="hero">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={movie.title}
          className="hero-backdrop"
        />
      )}
      <div className="hero-gradient" />
      <div className="hero-content">
        <h1 className="hero-title">{movie.title || movie.name}</h1>
        <p className="hero-overview">
          {movie.overview?.slice(0, 200)}
          {movie.overview?.length > 200 ? '...' : ''}
        </p>
        <div className="hero-buttons">
          <button className="hero-btn play">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Play
          </button>
          <button className="hero-btn info">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
