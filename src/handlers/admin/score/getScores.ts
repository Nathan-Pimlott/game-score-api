import { Request, Response } from 'express';

import { getScores } from '../../../services/score';

export async function getAdminScoresHandler(req: Request, res: Response) {
  console.log('Getting admin score');

  const { limit = 20, offset = 0, orderBy = 'name', order = 'asc' } = req.query;

  const scores = await getScores(
    limit as number,
    offset as number,
    orderBy as string,
    order as string
  );

  return res.status(200).send({ scores });
}
