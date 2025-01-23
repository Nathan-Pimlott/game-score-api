import { Request, Response } from 'express';
import _ from 'lodash';

import { query } from '../utils/db';
import { IPlatform } from '../types';
import { sortAsc } from '../utils/sort';

export async function getPlatforms(req: Request, res: Response) {
  const ungroupedPlatforms: any[] = await query(`
    select p.id, p.name, sp.scoreId, s.name scoreName, s.score, s.finishDate
    from platform p 
    join score_platforms sp on p.id = sp.platformId 
    join score s on s.id = sp.scoreId;
  `);

  const groupedPlatforms = _.groupBy(ungroupedPlatforms, 'id');

  const platforms: IPlatform[] = Object.keys(groupedPlatforms).map((id) => ({
    id,
    name: groupedPlatforms[id][0].name,
    featuredScores: sortAsc(
      groupedPlatforms[id].map(({ scoreId, scoreName, score, finishDate }) => ({
        id: scoreId,
        name: scoreName,
        score,
        finishDate,
      })),
      'name'
    ),
  }));

  return res.status(200).send({ platforms });
}
