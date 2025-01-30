import { Request, Response } from 'express';

import {
  createScoreThoughtLink,
  createThought,
} from '../../../services/thought';
import { formatThoughtToCreate } from '../../../utils/format';

export async function createThoughtHandler(req: Request, res: Response) {
  try {
    const formattedThought = await formatThoughtToCreate(req.body);

    if (!formattedThought) {
      throw Error('Unable to format platform.');
    }

    const { scoreId, ...thought } = formattedThought;

    await createScoreThoughtLink(scoreId, thought.id);
    await createThought(thought);

    return res.status(201).send(formattedThought);
  } catch (error) {
    return res.status(500).send();
  }
}
