import { Request, Response } from 'express';

import { formatPlatforms } from '../../utils/format';
import { getPlatforms } from '../../services/platform';

export async function getPlatformsHandler(req: Request, res: Response) {
  const unformattedPlatforms = await getPlatforms();

  const platforms = await formatPlatforms(unformattedPlatforms);

  return res.status(200).send({ platforms });
}
