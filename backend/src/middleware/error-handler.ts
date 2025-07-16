import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { ItemNotFoundError } from '../errors/errors';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  /* eslint-disable no-console */
  console.log(`Error -> ${err} ${err.stack}`);

  if (err instanceof MongooseError && err.name === 'ValidationError') {
    res.status(400).json({
      error: 'Validation Error',
      details: Object.values((err as MongooseError.ValidationError).errors).map(
        (e) => ({
          field: e.path,
          message: e.message,
        })
      ),
    });
    return;
  }

  // Handle all not found errors with 404
  if (err instanceof ItemNotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  }

  next(err);
};

export default errorHandler;
