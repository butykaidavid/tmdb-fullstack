const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Movie lists
router.get('/trending', movieController.getTrending);
router.get('/popular', movieController.getPopular);
router.get('/top-rated', movieController.getTopRated);
router.get('/upcoming', movieController.getUpcoming);
router.get('/now-playing', movieController.getNowPlaying);

// Movie details
router.get('/:id', movieController.getMovieDetails);
router.get('/:id/similar', movieController.getSimilarMovies);
router.get('/:id/recommendations', movieController.getRecommendations);
router.get('/:id/credits', movieController.getCredits);
router.get('/:id/videos', movieController.getVideos);
router.get('/:id/reviews', movieController.getReviews);

// Discover movies with filters
router.get('/discover/filter', movieController.discoverMovies);

module.exports = router;