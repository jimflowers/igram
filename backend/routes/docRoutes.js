const express = require('express');

const router = express.Router();
const {
  getDocs,
  createDoc,
  } = require('../controllers/docController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createDoc);

router.route('/:id').get(protect, getDocs)

module.exports = router;