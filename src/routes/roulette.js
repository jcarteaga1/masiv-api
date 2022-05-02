const express = require('express');

const router = express.Router();
const {
  createRoulettes,
  getRoulettes,
  openRoulettes,
} = require('../controllers/roulette');

router.get('/', getRoulettes);
router.get('/open/:id', openRoulettes);
router.post('/new', createRoulettes);
module.exports = router;
