import { Request, Response } from 'express';

import { getThoughtsForScore } from '../services/thought';
import { getPlatformsForScore } from '../services/platform';
import { getScore } from '../services/score';

export async function getScoreHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const scoreRes = await getScore(id);

    if (!scoreRes || !scoreRes.id) {
      throw Error('Unable to find score by id.');
    }

    const thoughts = await getThoughtsForScore(id);
    const platforms = await getPlatformsForScore(id);

    const score = {
      ...scoreRes,
      thoughts,
      platforms,
    };

    return res.status(200).send({
      score,
    });
  } catch (error) {
    return res.status(404).send();
  }
}
