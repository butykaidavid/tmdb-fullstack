const tmdbService = require('../services/tmdbService');

exports.searchMulti = async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const data = await tmdbService.searchMulti(query, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchMovies = async (req, res) => {
  try {
    const { query, page = 1, ...filters } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const data = await tmdbService.searchMovies(query, page, filters);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchTVShows = async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const data = await tmdbService.searchTVShows(query, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchPeople = async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const data = await tmdbService.searchPeople(query, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};