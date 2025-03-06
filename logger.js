const pino = require('pino');
// const rfs = require('rotating-file-stream');
// const path = require('path');
require('dotenv').config();
const logger = pino({
    level: 'debug',
    transport: {
              target: 'pino-pretty',
              options: {
                  colorize: true,
                  translateTime: 'yyyy-mm-dd HH:MM:ss',
                  ignore: 'pid,hostname'
              }
          }
});
module.exports = logger;