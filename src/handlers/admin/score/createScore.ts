import { Request, Response } from 'express';

import { formatScoreToCreate } from '../../../utils/format';
import {
  createScore,
  createScoreGenresLink,
  createScorePlatformsLink,
} from '../../../services/score';

export async function createScoreHandler(req: Request, res: Response) {
  try {
    const formattedData = await formatScoreToCreate(req.body);

    if (!formattedData) {
      throw Error('Unable to format data, will not create score.');
    }

    const [score, playedPlatforms, genres] = formattedData;

    const createScoreRes = await createScore(score);

    if (!createScoreRes) {
      throw Error('Failed to create score. Will not create links.');
    }

    await createScorePlatformsLink(score.id, playedPlatforms);
    await createScoreGenresLink(score.id, genres);

    return res.status(201).send({ id: score.id });
  } catch (error) {
    return res.status(500);
  }
}
