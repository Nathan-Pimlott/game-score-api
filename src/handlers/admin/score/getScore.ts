import { Request, Response } from 'express';

import { getAdminScore } from '../../../services/score';

export async function getAdminScoreHandler(req: Request, res: Response) {
  const { id } = req.params;

  const scores = await getAdminScore(id as string);

  return res.status(200).send({ scores });
}
