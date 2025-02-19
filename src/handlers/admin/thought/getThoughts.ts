import { Request, Response } from 'express';

import { getThoughtsForScore } from '../../../services/thought';

export async function getAdminThoughtsHandler(req: Request, res: Response) {
  const { scoreId = '' } = req.params;

  const thoughts = await getThoughtsForScore(scoreId as string);

  return res.status(200).send({ thoughts });
}
