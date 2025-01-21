import { Request, Response } from 'express';
import { mockScores } from '../utils/mock';

export async function searchScore(req: Request, res: Response) {
  const { searchText: encodedText } = req.query;

  if (!encodedText) {
    return res.status(422).send();
  }

  const searchText = decodeURI(encodedText as string).toLowerCase();

  const score = mockScores.filter((s) =>
    s.name.toLocaleLowerCase().includes(searchText)
  );

  return res.status(200).send({
    score,
  });
}
