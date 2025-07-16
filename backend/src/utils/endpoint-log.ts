import listEndpoints from 'express-list-endpoints';
import { Express } from 'express';
import logger from './logger';

export const logEndpoints = (app: Express) => {
  const endpoints = listEndpoints(app);
  logger.info('Available endpoints:');

  endpoints.forEach((endpoint) => {
    const methods = `[${endpoint.methods.join(', ')}]`.padEnd(20);
    const path = endpoint.path.padEnd(50);
    const middleware = endpoint.middlewares.length
      ? `[${endpoint.middlewares.join(', ')}]`
      : '[]';

    logger.info(`\t${methods}\t${path}\t${middleware}`);
  });
};
