import { Request, Response } from 'express';
import _ from 'lodash';

import { query } from '../utils/db';
import { IScore } from '../types';
import { sortAsc } from '../utils/sort';

export async function searchScore(req: Request, res: Response) {
  const { searchText } = req.query;

  const ungroupedScores = await query(`
      SELECT s.*, p.id platformId, p.name platformName 
      FROM SCORE s
      JOIN SCORE_PLATFORMS sp ON sp.scoreId = s.id
      JOIN PLATFORM p ON p.id = sp.platformId
      WHERE s.name like '%${searchText}%'
      ORDER BY s.name ASC
      LIMIT 10;
    `);

  const groupedScores = _.groupBy(ungroupedScores, 'id');

  const scores: IScore[] = Object.keys(groupedScores).map((id) => {
    const { name, score, timeToComplete, finishDate } = groupedScores[id][0];

    return {
      id,
      name,
      score,
      timeToComplete,
      finishDate,
      playedPlatforms: sortAsc(
        groupedScores[id].map(({ platformId, platformName }) => ({
          id: platformId,
          name: platformName,
        })),
        'name'
      ),
    };
  });

  return res.status(200).send({
    scores,
  });
}
