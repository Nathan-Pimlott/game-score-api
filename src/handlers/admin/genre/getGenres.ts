import { Request, Response } from 'express';

import { getGenres } from '../../../services/genre';

export async function getAdminGenresHandler(req: Request, res: Response) {
  const { limit = 20, offset = 0, orderBy = 'name', order = 'asc' } = req.query;

  const genres = await getGenres(
    limit as number,
    offset as number,
    orderBy as string,
    order as string
  );

  return res.status(200).send({ genres });
}
