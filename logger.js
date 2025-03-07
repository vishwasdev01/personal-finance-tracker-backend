const pino = require('pino');
require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';

const logger = pino({
    level: 'debug',
    ...(isDev && {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss',
                ignore: 'pid,hostname'
            }
        }
    })
});

module.exports = logger;
