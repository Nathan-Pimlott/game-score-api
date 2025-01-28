import { Request, Response } from 'express';

import { getPlatformCount } from '../../../services/platform';

export async function getAdminPlatformCountHandler(
  req: Request,
  res: Response
) {
  const count = await getPlatformCount();

  return res.status(200).send({ count });
}
