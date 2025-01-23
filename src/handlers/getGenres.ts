import { Request, Response } from 'express';
import _ from 'lodash';

import { query } from '../utils/db';
import { IGenre } from '../types';
import { sortAsc } from '../utils/sort';

export async function getGenres(req: Request, res: Response) {
  const ungroupedGenres: any[] = await query(`
      select g.id, g.name, sg.scoreId, s.name scoreName, s.score, s.finishDate
      from genre g 
      join score_genres sg on g.id = sg.genreId 
      join score s on s.id = sg.scoreId;
    `);

  const groupedGenres = _.groupBy(ungroupedGenres, 'id');

  const genres: IGenre[] = Object.keys(groupedGenres).map((id) => ({
    id,
    name: groupedGenres[id][0].name,
    featuredScores: sortAsc(
      groupedGenres[id].map(({ scoreId, scoreName, score, finishDate }) => ({
        id: scoreId,
        name: scoreName,
        score,
        finishDate,
      })),
      'name'
    ),
  }));

  return res.status(200).send({ genres });
}
