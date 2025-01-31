import { Request, Response } from 'express';

import { updateThought } from '../../../services/thought';
import { formatThoughtToUpdate } from '../../../utils/format';

export async function updateAdminThoughtHandler(req: Request, res: Response) {
  try {
    const formattedThought = await formatThoughtToUpdate(req.body);

    if (!formattedThought) {
      throw Error('Unable to format platform.');
    }

    await updateThought(formattedThought);

    return res.status(201).send(formattedThought);
  } catch (error) {
    return res.status(500).send();
  }
}
