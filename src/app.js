const express = require('express');
require('dotenv').config();
const roulettesRoutes = require('./routes/roulette');
const UsersRoutes = require('./routes/user');
const BetsRoutes = require('./routes/bet');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/roulettes', roulettesRoutes);
app.use('/users', UsersRoutes);
app.use('/bets', BetsRoutes);

module.exports = app;
