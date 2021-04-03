const express = require('express');
const validate = require('../middleware/validate');
const timerController = require('../controllers/timer.controller');
const fastingController = require('../controllers/fasting.controller');

const Api = express.Router();

Api.post('/fasting/stats', fastingController.getStats);
Api.post('/fasting/average', fastingController.getAverage);
Api.post('/fasting/history', fastingController.getHistory);

Api.post('/startTimer', timerController.startTimer);
Api.post('/stopTimer', timerController.endTimer);

module.exports = Api;
