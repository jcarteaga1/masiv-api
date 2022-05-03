const express = require('express');

const router = express.Router();
const { createUser } = require('../controllers/user');

router.post('/singup', createUser);
module.exports = router;
