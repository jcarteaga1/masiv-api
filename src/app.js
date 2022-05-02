const express = require('express');
const roulettesRoutes = require('./routes/roulette');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/roulettes', roulettesRoutes);

module.exports = app;
