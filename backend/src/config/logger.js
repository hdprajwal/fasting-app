const { createLogger, format, transports } = require('winston');
const { resolve } = require('path');
const config = require('./config');

const { combine, timestamp, printf, label } = format;
const logFormat = printf(
  ({ level, message, timestamp: log_timestamp }) =>
    `${log_timestamp} ${level}: ${message}`
);
const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    enumerateErrorFormat(),
    config.env === 'development' ? format.colorize() : format.uncolorize(),
    format.splat(),
    logFormat
  ),
  transports: [
    new transports.Console({}),
    new transports.File({
      filename: resolve(__dirname, '../logs/server.log'),
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        enumerateErrorFormat(),
        format.uncolorize(),
        format.splat(),
        logFormat
      ),
    }),
  ],
});

module.exports = logger;
