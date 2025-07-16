import express, { Request, Response } from 'express';
import dummyRoutes from './items-routes';
import userRoutes from './user-routes';

const r = express.Router();

// Mount routes
r.use('/', dummyRoutes);
r.use('/', userRoutes);

r.get('/healthcheck', (_: Request, res: Response) => {
  res.status(200).json({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  });
});

export default r;
