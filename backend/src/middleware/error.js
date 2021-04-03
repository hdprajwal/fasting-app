const status = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');

const handleError = (err, res) => {
  if (!err.statusCode) {
    // eslint-disable-next-line no-param-reassign
    err.statusCode = status.INTERNAL_SERVER_ERROR;
  }

  const response = {
    code: err.statusCode,
    message: err.message || 'Internal servre error',
    ...(config.env === 'development' && { stack: err.stack }),
  };
  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(err.statusCode).json({
    ...response,
    status: 'error',
  });
};

module.exports = handleError;
