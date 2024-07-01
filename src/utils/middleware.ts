import { RequestHandler } from 'express';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const { token = '' } = req.headers;

  if (!token) {
    return res.status(404).send();
  }

  return next();
};
