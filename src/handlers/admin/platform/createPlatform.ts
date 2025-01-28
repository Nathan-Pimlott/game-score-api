import { Request, Response } from 'express';

import { createPlatform } from '../../../services/platform';
import { formatPlatformToCreate } from '../../../utils/format';

export async function createPlatformHandler(req: Request, res: Response) {
  try {
    const formattedPlatform = await formatPlatformToCreate(req.body);

    if (!formattedPlatform) {
      throw Error('Unable to format platform.');
    }

    const createRes = await createPlatform(formattedPlatform);

    if (!createRes) {
      throw Error('Unable to create platform.');
    }

    return res.status(201).send(formattedPlatform);
  } catch (error) {
    return res.status(500).send();
  }
}
