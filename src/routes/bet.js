const express = require('express');

const router = express.Router();
const { createBet } = require('../controllers/bet');
const { authMiddleware } = require('../middlewares/auth');

router.post('/new', authMiddleware, createBet);
module.exports = router;
