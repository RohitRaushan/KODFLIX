import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovieRow from './components/MovieRow'

const API_BASE = import.meta.env.DEV ? 'http://localhost:5000/api' : `https://api.themoviedb.org/3`;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '995c76835f8113d2d2ce0f2e788b6bb2';

const fetchMovies = async (endpoint) => {
  const separator = endpoint.includes('?') ? '&' : '?';
  const res = await fetch(`${API_BASE}/${endpoint}${separator}api_key=${API_KEY}&language=en-US`);
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
          fetchMovies('trending/movie/week'),
          fetchMovies('movie/popular'),
          fetchMovies('movie/top_rated'),
          fetchMovies('movie/upcoming'),
          fetchMovies('discover/movie?with_networks=213')
        ])

        setTrending(trendingData.results || [])
        setPopular(popularData.results || [])
        setTopRated(topRatedData.results || [])
        setUpcoming(upcomingData.results || [])
        setNetflixOriginals(originalsData.results || [])
        setLoading(false)
      } catch (err) {
        setError('Failed to load movies. Make sure the server is running.')
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
