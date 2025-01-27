import { Request, Response } from 'express';

import { formatScores } from '../../utils/format';
import { getScoresBySearchText } from '../../services/score';

export async function searchScoreHandler(req: Request, res: Response) {
  const { searchText } = req.query;

  const unformattedScores = await getScoresBySearchText(searchText as string);

  const scores = await formatScores(unformattedScores);

  return res.status(200).send({
    scores,
  });
}
