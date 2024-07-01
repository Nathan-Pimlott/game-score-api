import { Request, Response } from 'express';
import { IScore } from '../types';

export async function getScores(req: Request, res: Response) {
  return res.status(200).send({
    scores: [
      {
        id: '123',
        name: 'Game 1',
        score: 80,
        timeToComplete: '2 weeks',
        finishDate: '2024-07-01T00:00:00',
        playedConsoles: ['Switch'],
        thoughts: 'Game was alright.',
      },
      {
        id: '234',
        name: 'Game 2',
        score: 95,
        timeToComplete: '4 weeks',
        finishDate: '2024-06-01T00:00:00',
        playedConsoles: ['SteamDeck'],
        thoughts: 'Game was good.',
      },
    ],
  });
}
