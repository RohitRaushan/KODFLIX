import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovieRow from './components/MovieRow'

const API_BASE = import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://kodflix-api.onrender.com/api'

const fetchMovies = async (endpoint) => {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  return res.json();
};

function App() {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [netflixOriginals, setNetflixOriginals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [trendingData, popularData, topRatedData, upcomingData, originalsData] = await Promise.all([
          fetchMovies('trending'),
          fetchMovies('popular'),
          fetchMovies('top-rated'),
          fetchMovies('upcoming'),
          fetchMovies('netflix-originals')
        ])

        setTrending(trendingData.results || [])
        setPopular(popularData.results || [])
        setTopRated(topRatedData.results || [])
        setUpcoming(upcomingData.results || [])
        setNetflixOriginals(originalsData.results || [])
        setLoading(false)
      } catch (err) {
        setError('Failed to load movies. Please try again later.')
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  const featuredMovie = trending[0] || popular[0]

  return (
    <div className="app">
      <Navbar />
      {featuredMovie && <Hero movie={featuredMovie} />}
      <MovieRow title="Trending Now" movies={trending} />
      <MovieRow title="Netflix Originals" movies={netflixOriginals} isOriginals />
      <MovieRow title="Popular on Kodflix" movies={popular} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Upcoming" movies={upcoming} />
    </div>
  )
}

export default App
