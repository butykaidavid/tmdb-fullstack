const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router.get('/popular', personController.getPopularPeople);
router.get('/:id', personController.getPersonDetails);

module.exports = router;