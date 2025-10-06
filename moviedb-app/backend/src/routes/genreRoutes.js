const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/movies', genreController.getMovieGenres);
router.get('/tv', genreController.getTVGenres);
router.get('/all', genreController.getAllGenres);

module.exports = router;