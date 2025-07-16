import 'newrelic';
import express, { Request, Response } from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import routes from './routes/routes';
import connectToDb from './config/db';
import errorHandler from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import logger from './utils/logger';
import { logEndpoints } from './utils/endpoint-log';

/* eslint-disable no-underscore-dangle */

dotenv.config();

const filename = fileURLToPath(import.meta.url);
const dir = path.dirname(filename);

const app = express();
const port = process.env.NODE_ENV === 'test' ? 1212 : process.env.PORT || 5001;

// Trust proxy settings for Railway/production environment
app.set('trust proxy', 1);

axios.interceptors.request.use(
  (request) =>
    //  console.log('axios Request to ', JSON.stringify(request.url, null, 2));
    request
);

connectToDb().then(() => {
  logger.info('Mongo Connected');
});

app.use(express.json());
app.use(requestLogger);
app.use('/api', routes);

// Handle 404s for API routes
app.use('/api', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serve static files from the React app
app.use(express.static(path.join(dir, '../../frontend/dist')));

// Use custom error handler middleware
app.use(errorHandler);

// Handle React routing, return all requests to React app
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(dir, '../../frontend/dist/index.html'));
});

app.listen(port, () => {
  logger.info(`Running on port ${port}`);
  logEndpoints(app);
});

export default app;
