
const express = require('express');
const app = express();
const routes = require('./routes');
const { errorHandler, accessControl } = require('./middlewares');

app.use(accessControl);
app.use(express.json());
app.use('/', routes);
app.use(errorHandler);

module.exports = app;
