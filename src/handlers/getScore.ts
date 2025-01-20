import { Request, Response } from 'express';
import { mockScores } from '../utils/mock';

export async function getScore(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    // Throw some error here...
  }

  const score = mockScores.find((s) => s.id === id);

  if (!score?.id) {
    return res.status(404).send();
  }

  return res.status(200).send({
    score,
  });
}
