import { Request, Response } from 'express';

import { mockGenres } from '../utils/mock';

export function getGenres(req: Request, res: Response) {
  return res.status(200).send({ genres: mockGenres });
}
