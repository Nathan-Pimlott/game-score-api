import { Request, Response } from 'express';

import { connect, query } from '../utils/db';
import { IGenre } from '../types';

export async function getGenres(req: Request, res: Response) {
  const connection = await connect();
  const genres: IGenre[] = await query('SELECT * FROM GENRE;');
  console.log({ genres });

  return res.status(200).send({ genres });
}
