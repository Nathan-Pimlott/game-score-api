import { Request, Response } from 'express';

import { formatGenres } from '../../utils/format';
import { getGenresWithScores } from '../../services/genre';

export async function getConsumerGenresHandler(req: Request, res: Response) {
  const unformattedGenres = await getGenresWithScores();

  const genres = await formatGenres(unformattedGenres);

  return res.status(200).send({ genres });
}
