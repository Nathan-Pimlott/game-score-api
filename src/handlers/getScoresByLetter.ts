import { Request, Response } from 'express';
import _ from 'lodash';

import { mockScores } from '../utils/mock';

export async function getScoresByLetter(req: Request, res: Response) {
  const { letter } = req.params;

  const scores = mockScores
    .filter((s) => s.name.startsWith(letter))
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map(({ id, name, score, playedPlatforms, finishDate }) => ({
      id,
      name,
      score,
      playedPlatforms,
      finishDate,
    }));

  return res.status(200).send({
    scores,
  });
}
