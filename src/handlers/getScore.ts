import { Request, Response } from 'express';

export async function getScore(req: Request, res: Response) {
  return res.status(200).send({
    score: {
      id: '123',
      name: 'Game 1',
      score: 80,
      timeToComplete: '2 weeks',
      finishDate: '2024-07-01T00:00:00',
      playedConsoles: ['Switch'],
      thoughts: 'Game was alright.',
    },
  });
}
