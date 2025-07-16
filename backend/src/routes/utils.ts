import { Request, Response, NextFunction } from 'express';

// This wraps the calls and forwards errors to global handler
export const use = (fn: any) => {
  const wrapped = (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

  // Gives it a name so the logging shows the correct middleware name
  Object.defineProperty(wrapped, 'name', { value: fn.name || 'handler' });
  return wrapped;
};
