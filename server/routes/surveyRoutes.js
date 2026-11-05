const express = require('express');
const router = express.Router();
const {
  createSurvey,
  getAllSurveys,
  getSurveyById,
  getSurveyStats
} = require('../controllers/surveyController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public endpoints
router.post('/', createSurvey);
router.get('/stats/overview', getSurveyStats);

// Admin-only endpoints
router.get('/', protect, adminOnly, getAllSurveys);
router.get('/:id', protect, adminOnly, getSurveyById);

module.exports = router;
