import { Request, Response } from 'express';

import { query } from '../utils/db';
import { IPlatform } from '../types';

// export async function getPlatforms(req: Request, res: Response) {
//   const platforms: IPlatform[] = await query('SELECT * FROM PLATFORM;');
//   return res.status(200).send({ platforms });
// }

export async function getPlatforms(req: Request, res: Response) {
  const platforms: IPlatform[] = await query(`SELECT * FROM PLATFORM;`);
  await Promise.all(
    platforms.map(async (platform) => {
      const latestScoresForPlatform = await query(`
      SELECT sp.scoreId, s.name, s.score, s.finishDate 
      FROM SCORE_PLATFORMS sp
      JOIN SCORE s 
      ON s.id = sp.scoreId
      WHERE sp.platformId = '${platform.id}'
      ORDER BY s.finishDate DESC
      LIMIT 2;
    `);
      console.log({ latestScoresForPlatform });

      platform.featuredScores = latestScoresForPlatform;
    })
  );
  console.log({ platforms });

  return res.status(200).send({ platforms });
}
