import { Request, Response } from 'express';
import _ from 'lodash';

import { query } from '../utils/db';
import { IScore } from '../types';
import { sortAsc } from '../utils/sort';

export async function getScore(req: Request, res: Response) {
  const { id } = req.params;
  const ungroupedScore = await query(`
      SELECT s.*, p.id platformId, p.name platformName 
      FROM SCORE s
      JOIN SCORE_PLATFORMS sp ON sp.scoreId = s.id
      JOIN PLATFORM p ON p.id = sp.platformId
      WHERE s.id = '${id}';
    `);

  const { name, score, timeToComplete, finishDate } = ungroupedScore[0];

  const formattedScore: IScore = {
    id,
    name,
    score,
    timeToComplete,
    finishDate,
    playedPlatforms: sortAsc(
      ungroupedScore.map(({ platformId, platformName }: any) => ({
        id: platformId,
        name: platformName,
      })),
      'name'
    ),
  };

  return res.status(200).send({
    score: formattedScore,
  });
}
