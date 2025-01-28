import { Request, Response } from 'express';

import { getAdminPlatform } from '../../../services/platform';

export async function getAdminPlatformHandler(req: Request, res: Response) {
  const { id } = req.params;

  const scores = await getAdminPlatform(id as string);

  return res.status(200).send({ scores });
}
