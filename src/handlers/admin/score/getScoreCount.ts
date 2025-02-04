import { Request, Response } from 'express';

import { getScoreCount } from '../../../services/score';

export async function getAdminScoreCountHandler(req: Request, res: Response) {
  const count = await getScoreCount();

  return res.status(200).send({ count });
}
