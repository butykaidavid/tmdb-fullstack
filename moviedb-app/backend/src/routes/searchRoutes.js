const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/multi', searchController.searchMulti);
router.get('/movies', searchController.searchMovies);
router.get('/tv', searchController.searchTVShows);
router.get('/people', searchController.searchPeople);

module.exports = router;