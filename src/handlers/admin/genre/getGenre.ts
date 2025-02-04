import { Request, Response } from 'express';

import { getAdminGenre } from '../../../services/genre';

export async function getAdminGenreHandler(req: Request, res: Response) {
  const { genreId } = req.params;

  const genre = await getAdminGenre(genreId as string);

  return res.status(200).send({ genre });
}
