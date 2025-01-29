import { Request, Response } from 'express';

import { getAdminScoresBySearchText } from '../../../services/score';

export async function getAdminSearchScoresHandler(req: Request, res: Response) {
  const {
    searchText = '',
    limit = 0,
    offset = 0,
    orderBy = 'name',
    order = 'asc',
  } = req.query;

  const scores = await getAdminScoresBySearchText(
    searchText as string,
    limit as number,
    offset as number,
    orderBy as string,
    order as string
  );

  return res.status(200).send({
    scores,
  });
}
