const tmdbService = require('../services/tmdbService');

exports.getPopularPeople = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const data = await tmdbService.getPopularPeople(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPersonDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tmdbService.getPersonDetails(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};