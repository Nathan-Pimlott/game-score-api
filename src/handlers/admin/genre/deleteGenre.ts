import { Request, Response } from 'express';

import { deleteGenre } from '../../../services/genre';

export async function deleteGenreHandler(req: Request, res: Response) {
  try {
    const { genreId } = req.params;

    const deleteRes = await deleteGenre(genreId as string);

    if (!deleteRes) {
      throw Error('Unable to delete genre.');
    }

    return res.status(202).send();
  } catch (error) {
    return res.status(500).send();
  }
}
