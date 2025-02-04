import { Request, Response } from 'express';

import { getAdminPlatform } from '../../../services/platform';

export async function getAdminPlatformHandler(req: Request, res: Response) {
  const { platformId } = req.params;

  const platform = await getAdminPlatform(platformId as string);

  return res.status(200).send({ platform });
}
