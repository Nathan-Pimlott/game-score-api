import { Request, Response } from 'express';

import { formatGenres } from '../utils/format';
import { getGenres } from '../services/genre';

export async function getGenresHandler(req: Request, res: Response) {
  const unformattedGenres = await getGenres();

  const genres = await formatGenres(unformattedGenres);

  return res.status(200).send({ genres });
}
