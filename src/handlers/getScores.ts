import { Request, Response } from 'express';
import { mockScores } from '../utils/mock';

export async function getScores(req: Request, res: Response) {
  return res.status(200).send({
    scores: mockScores,
  });
}
