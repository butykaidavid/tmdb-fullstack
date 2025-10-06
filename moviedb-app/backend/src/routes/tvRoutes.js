const express = require('express');
const router = express.Router();
const tvController = require('../controllers/tvController');

// TV Show lists
router.get('/popular', tvController.getPopular);
router.get('/top-rated', tvController.getTopRated);
router.get('/on-the-air', tvController.getOnTheAir);
router.get('/airing-today', tvController.getAiringToday);

// TV Show details
router.get('/:id', tvController.getTVShowDetails);
router.get('/:id/similar', tvController.getSimilarShows);
router.get('/:id/recommendations', tvController.getRecommendations);
router.get('/:id/credits', tvController.getCredits);
router.get('/:id/videos', tvController.getVideos);
router.get('/:id/reviews', tvController.getReviews);
router.get('/:id/season/:seasonNumber', tvController.getSeasonDetails);

// Discover TV shows with filters
router.get('/discover/filter', tvController.discoverTVShows);

module.exports = router;