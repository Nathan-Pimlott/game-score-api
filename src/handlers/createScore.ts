import { Request, Response } from 'express';
// import { IScore } from '../types';

// This still needs some thought. May need its own project.
export async function createScoreHandler(req: Request, res: Response) {
  return res.status(201).send(req.body.score);
  // const score: IScoreToCreate = req.body.score;

  // const createdScore: IScore = {
  //   ...score,
  //   id: '123',
  // };

  // return res.status(201).send({ score: createdScore });
}
