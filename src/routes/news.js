const express = require('express');
const router = express.Router();

const newController = require('../app/controllers/NewsController');

// NewsController.index
router.get('/', newController.index);

module.exports = router;