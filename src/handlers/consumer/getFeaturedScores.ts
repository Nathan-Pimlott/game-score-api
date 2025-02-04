import { Request, Response } from 'express';

import { formatFeaturedScores } from '../../utils/format';
import { getFeaturedScores } from '../../services/score';

export async function getFeaturedScoresHandler(req: Request, res: Response) {
  const unformattedScores = await getFeaturedScores();

  const featuredScores = await formatFeaturedScores(unformattedScores);

  return res.status(200).send({
    featuredScores,
  });
}
