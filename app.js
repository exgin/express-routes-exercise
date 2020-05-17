const express = require('express');
const app = express();
const itemRoutes = require('./routes/itemRoutes');
const ExpresError = require('./expressError');

app.use(express.json());
app.use('/items', itemRoutes);

app.use(function (req, res, next) {
  return new ExpresError('Page not found', 404);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);

  return res.json({
    error: error.message,
  });
});

module.exports = app;
