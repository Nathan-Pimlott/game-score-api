import { Request, Response } from 'express';

import { updatePlatform } from '../../../services/platform';
import { formatPlatformToUpdate } from '../../../utils/format';

export async function updatePlatformHandler(req: Request, res: Response) {
  try {
    const formattedPlatform = await formatPlatformToUpdate(req.body);

    if (!formattedPlatform) {
      throw Error('Unable to format platform.');
    }

    const updateRes = await updatePlatform(formattedPlatform);

    if (!updateRes) {
      throw Error('Unable to update platform.');
    }

    return res.status(201).send(formattedPlatform);
  } catch (error) {
    return res.status(500).send();
  }
}
