const express = require('express');

const router = express.Router();
const {
  createRoulettes,
  getRoulettes,
  openRoulettes,
  closeRoulettes,
} = require('../controllers/roulette');

router.get('/', getRoulettes);
router.post('/open/:id', openRoulettes);
router.post('/new', createRoulettes);
router.post('/close/:id', closeRoulettes);
module.exports = router;
