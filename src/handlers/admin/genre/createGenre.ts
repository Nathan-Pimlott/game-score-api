import { Request, Response } from 'express';

import { createGenre } from '../../../services/genre';
import { formatGenreToCreate } from '../../../utils/format';

export async function createGenreHandler(req: Request, res: Response) {
  try {
    const formattedGenre = await formatGenreToCreate(req.body);

    if (!formattedGenre) {
      throw Error('Unable to format genre.');
    }

    const createRes = await createGenre(formattedGenre);

    if (!createRes) {
      throw Error('Unable to create genre.');
    }

    return res.status(201).send(formattedGenre);
  } catch (error) {
    return res.status(500).send();
  }
}
