import { Request, Response } from 'express';

import { deletePlatform } from '../../../services/platform';

export async function deletePlatformHandler(req: Request, res: Response) {
  try {
    const { platformId } = req.params;

    const deleteRes = await deletePlatform(platformId as string);

    if (!deleteRes) {
      throw Error('Unable to delete platform.');
    }

    return res.status(202).send();
  } catch (error) {
    return res.status(500).send();
  }
}
