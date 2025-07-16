import morgan from 'morgan';
import logger from '../utils/logger';

const morganFormat =
  ':method :url :referrer :status :response-time ms :res[content-length]';

const morganStream = {
  write: (message: string) => {
    // Parse Morgan's log message into components
    const [
      httpMethod,
      requestUrl,
      referrerUrl,
      statusCode,
      responseTime,
      timeUnit,
      responseSize,
    ] = message.trim().split(' ');

    // Format the components
    const paddedUrl = requestUrl.padEnd(50);
    const formattedReferrer = referrerUrl === '-' ? '[]' : `[${referrerUrl}]`;
    const sizeInKb = responseSize
      ? (parseInt(responseSize, 10) / 1024).toFixed(2)
      : '0.00';

    // Log in the desired format
    logger.info(
      `${responseTime}${timeUnit} ${sizeInKb}kb ${httpMethod} ${statusCode} ${paddedUrl} referrer:${formattedReferrer}`
    );
  },
};

export const requestLogger = morgan(morganFormat, { stream: morganStream });
