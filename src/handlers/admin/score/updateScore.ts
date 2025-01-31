import { Request, Response } from 'express';

import { formatScoreToUpdate } from '../../../utils/format';
import { updateScore } from '../../../services/score';

export async function updateScoreHandler(req: Request, res: Response) {
  try {
    const formattedData = await formatScoreToUpdate(req.body);

    if (!formattedData) {
      throw Error('Unable to format data, will not create score.');
    }

    const [score, playedPlatforms, genres] = formattedData;

    const updateScoreRes = await updateScore(score, genres, playedPlatforms);
    console.log({ updateScoreRes });

    if (!updateScoreRes) {
      throw Error('Failed to update score.');
    }

    return res.status(201).send({ success: true });
  } catch (error) {
    return res.status(500);
  }
}
