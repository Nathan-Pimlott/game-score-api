import { Request, Response } from 'express';
import _ from 'lodash';

import { mockScores } from '../utils/mock';

export async function getFeaturedScores(req: Request, res: Response) {
  // This will eventually be a DB call but we just need the sorted formatted
  // objects for now.
  const featuredScores = _.sortBy(mockScores, (s) => new Date(s.finishDate))
    .reverse()
    .slice(0, 3)
    .map(({ id, name, score, playedPlatforms, finishDate }) => ({
      id,
      name,
      score,
      playedPlatforms,
      finishDate,
    }));

  return res.status(200).send({
    scores: featuredScores,
  });
}
