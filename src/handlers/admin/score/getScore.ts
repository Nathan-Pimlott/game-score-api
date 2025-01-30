import { Request, Response } from 'express';

import { getAdminScore } from '../../../services/score';

export async function getAdminScoreHandler(req: Request, res: Response) {
  const { scoreId } = req.params;

  const score = await getAdminScore(scoreId as string);

  return res.status(200).send({ score });
}
