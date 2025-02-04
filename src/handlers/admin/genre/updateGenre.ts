import { Request, Response } from 'express';

import { createGenre, updateGenre } from '../../../services/genre';
import { formatGenreToUpdate } from '../../../utils/format';

export async function updateGenreHandler(req: Request, res: Response) {
  try {
    const formattedGenre = await formatGenreToUpdate(req.body);

    if (!formattedGenre) {
      throw Error('Unable to format genre.');
    }

    const updateRes = await updateGenre(formattedGenre);

    if (!updateRes) {
      throw Error('Unable to update genre.');
    }

    return res.status(201).send(formattedGenre);
  } catch (error) {
    return res.status(500).send();
  }
}
