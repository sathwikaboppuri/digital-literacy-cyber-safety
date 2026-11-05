const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public endpoint
router.post('/', createContact);

// Admin-only endpoints
router.get('/', protect, adminOnly, getAllContacts);
router.patch('/:id/status', protect, adminOnly, updateContactStatus);
router.delete('/:id', protect, adminOnly, deleteContact);

module.exports = router;
