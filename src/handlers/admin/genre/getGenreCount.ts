import { Request, Response } from 'express';

import { getGenreCount } from '../../../services/genre';

export async function getAdminGenreCountHandler(req: Request, res: Response) {
  const count = await getGenreCount();

  return res.status(200).send({ count });
}
