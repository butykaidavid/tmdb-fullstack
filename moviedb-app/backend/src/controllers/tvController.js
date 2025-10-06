const tmdbService = require('../services/tmdbService');

exports.getPopular = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getPopularTVShows(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopRated = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getTopRatedTVShows(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOnTheAir = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getOnTheAirTVShows(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAiringToday = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getAiringTodayTVShows(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTVShowDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tmdbService.getTVShowDetails(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSimilarShows = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const response = await tmdbService.client.get(`/tv/${id}/similar`, {
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
    const response = await tmdbService.client.get(`/tv/${id}/recommendations`, {
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
    const response = await tmdbService.client.get(`/tv/${id}/credits`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await tmdbService.client.get(`/tv/${id}/videos`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const response = await tmdbService.client.get(`/tv/${id}/reviews`, {
      params: { page }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSeasonDetails = async (req, res) => {
  try {
    const { id, seasonNumber } = req.params;
    const response = await tmdbService.client.get(`/tv/${id}/season/${seasonNumber}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.discoverTVShows = async (req, res) => {
  try {
    const filters = req.query;
    const data = await tmdbService.discoverTVShows(filters);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};