import { Request, Response } from 'express';
import { IScore, IScoreToCreate } from '../types';

export async function createScore(req: Request, res: Response) {
  const score: IScoreToCreate = req.body.score;

  const createdScore: IScore = {
    ...score,
    id: '123',
  };

  return res.status(201).send({ score: createdScore });
}
