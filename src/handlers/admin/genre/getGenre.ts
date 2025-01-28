import { Request, Response } from 'express';

import { getAdminGenre } from '../../../services/genre';

export async function getAdminGenreHandler(req: Request, res: Response) {
  const { id } = req.params;

  const scores = await getAdminGenre(id as string);

  return res.status(200).send({ scores });
}
