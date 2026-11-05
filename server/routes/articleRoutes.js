const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public endpoints
router.get('/', getArticles);
router.get('/:id', getArticleById);

// Admin-only endpoints
router.post('/', protect, adminOnly, createArticle);
router.put('/:id', protect, adminOnly, updateArticle);
router.delete('/:id', protect, adminOnly, deleteArticle);

module.exports = router;
