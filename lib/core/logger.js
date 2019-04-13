const winston = require('winston');

const formatter = winston.format.combine(winston.format.colorize(), winston.format.simple());

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: formatter,
    }),
  ],
});

module.exports = logger;
