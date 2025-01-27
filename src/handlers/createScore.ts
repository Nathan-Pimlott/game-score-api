import { Request, Response } from 'express';

import { formatFeaturedScores } from '../utils/format';
import { getFeaturedScores } from '../services/score';

export async function createScoreHandler(req: Request, res: Response) {
  try {
    console.log({ body: req.body });

    // const formattedScore = await formatScoreToCreate(req.body);

    // const createRes = await createScore(formattedScore);

    return res.status(201).send({
      // score: createRes,
    });
  } catch (error) {
    return res.status(500);
  }
}
