import { Request, Response } from 'express';

import { getSearchCount } from '../../../services/score';

export async function getAdminSearchScoreCountHandler(
  req: Request,
  res: Response
) {
  const { searchText = '' } = req.query;

  const count = await getSearchCount(searchText as string);

  return res.status(200).send({ count });
}
