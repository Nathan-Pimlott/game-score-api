import { Request, Response } from 'express';

import { query } from '../utils/db';

export async function getScoresByLetter(req: Request, res: Response) {
  const { letter } = req.params;

  const scoresByLetter = await query(`
      SELECT * FROM SCORE
      WHERE name like '${letter}%'
      ORDER BY finishDate DESC
    `);

  return res.status(200).send({
    scoresByLetter,
  });
}
