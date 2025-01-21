import { Request, Response } from 'express';

import { mockPlatforms } from '../utils/mock';

export function getPlatforms(req: Request, res: Response) {
  return res.status(200).send({ platforms: mockPlatforms });
}
