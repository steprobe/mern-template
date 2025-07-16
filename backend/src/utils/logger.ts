import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'test' ? 'error' : 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      ({ timestamp, message }) => `${timestamp}: ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
