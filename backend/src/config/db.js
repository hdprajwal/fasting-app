const mongoose = require('mongoose');
const config = require('./config');

const db = {
  connect: mongoose.connect(config.mongoose.url, config.mongoose.options),
};

module.exports = db;
