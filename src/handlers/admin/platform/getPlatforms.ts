import { Request, Response } from 'express';

import { getPlatforms } from '../../../services/platform';

export async function getAdminPlatformsHandler(req: Request, res: Response) {
  const { limit = 20, offset = 0, orderBy = 'name', order = 'asc' } = req.query;

  const platforms = await getPlatforms(
    limit as number,
    offset as number,
    orderBy as string,
    order as string
  );

  return res.status(200).send({ platforms });
}
