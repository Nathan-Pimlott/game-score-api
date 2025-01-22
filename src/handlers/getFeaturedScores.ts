import { Request, Response } from 'express';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

import { mockScores } from '../utils/mock';
import { query } from '../utils/db';

export async function getFeaturedScores(req: Request, res: Response) {
  const featuredScores = await query(`
    SELECT * FROM SCORE
    ORDER BY finishDate DESC
    LIMIT 2;
  `);

  return res.status(200).send({
    featuredScores,
  });
}
