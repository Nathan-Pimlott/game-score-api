import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log({ reqBody: req.body });

      await schema.parseAsync(req);
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
