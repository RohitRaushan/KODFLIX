import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

app.use(cors());
app.use(express.json());

const fetchTMDB = async (endpoint) => {
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch data');
  const data = await response.json();
  return data;
};

app.get('/api/trending', async (req, res) => {
  try {
    const data = await fetchTMDB('/trending/movie/week?language=en-US');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/popular', async (req, res) => {
  try {
    const data = await fetchTMDB('/movie/popular?language=en-US&page=1');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/top-rated', async (req, res) => {
  try {
    const data = await fetchTMDB('/movie/top_rated?language=en-US&page=1');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/upcoming', async (req, res) => {
  try {
    const data = await fetchTMDB('/movie/upcoming?language=en-US&page=1');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query required' });
    const data = await fetchTMDB(`/search/movie?query=${encodeURIComponent(q)}&language=en-US`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/netflix-originals', async (req, res) => {
  try {
    const data = await fetchTMDB('/discover/movie?with_networks=213&language=en-US');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api', async (req, res) => {
  try {
    const { endpoint } = req.query;
    if (!endpoint) return res.status(400).json({ error: 'Endpoint required' });
    const data = await fetchTMDB(`/${endpoint}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
