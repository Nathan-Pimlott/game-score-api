import { Request, Response } from 'express';

import { getScoresByLetter } from '../../services/score';
import { formatScores } from '../../utils/format';

export async function getScoresByLetterHandler(req: Request, res: Response) {
  const { letter } = req.params;

  const unformattedScoresByLetter = await getScoresByLetter(letter);

  const scoresByLetter = await formatScores(unformattedScoresByLetter);

  return res.status(200).send({
    scoresByLetter,
  });
}
