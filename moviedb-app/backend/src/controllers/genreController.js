const tmdbService = require('../services/tmdbService');

exports.getMovieGenres = async (req, res) => {
  try {
    const data = await tmdbService.getMovieGenres();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTVGenres = async (req, res) => {
  try {
    const data = await tmdbService.getTVGenres();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllGenres = async (req, res) => {
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      tmdbService.getMovieGenres(),
      tmdbService.getTVGenres()
    ]);
    
    res.json({
      movie: movieGenres.genres,
      tv: tvGenres.genres
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};