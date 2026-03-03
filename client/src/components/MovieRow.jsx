import { useRef } from 'react'
import MovieCard from './MovieCard'

function MovieRow({ title, movies, isOriginals = false }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = isOriginals ? 400 : 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-row-container" ref={scrollRef}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isOriginal={isOriginals}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieRow
