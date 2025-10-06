const tmdbService = require('../services/tmdbService');

exports.getTrending = async (req, res) => {
  try {
    const { page = 1, timeWindow = 'week' } = req.query;
    const data = await tmdbService.getTrending('movie', timeWindow, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPopular = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getPopularMovies(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopRated = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getTopRatedMovies(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUpcoming = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getUpcomingMovies(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNowPlaying = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getNowPlayingMovies(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tmdbService.getMovieDetails(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const response = await tmdbService.client.get(`/movie/${id}/similar`, {
      params: { page }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const response = await tmdbService.client.get(`/movie/${id}/recommendations`, {
      params: { page }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCredits = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await tmdbService.client.get(`/movie/${id}/credits`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await tmdbService.client.get(`/movie/${id}/videos`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const response = await tmdbService.client.get(`/movie/${id}/reviews`, {
      params: { page }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.discoverMovies = async (req, res) => {
  try {
    const filters = req.query;
    const data = await tmdbService.discoverMovies(filters);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};