import { IGenre } from '../types';
import { query } from '../utils/db';

export async function getGenresWithScores() {
  try {
    const genreRes = await query(`
        select g.id, g.name, sg.scoreId, s.name scoreName, s.score, s.finishDate
        from genre g 
        join score_genres sg on g.id = sg.genreId 
        join score s on s.id = sg.scoreId;
    `);

    return genreRes;
  } catch (error) {
    return [];
  }
}

export async function getGenres(limit: number, offset: number) {
  try {
    const genreRes = await query(`
        select * from genre 
        limit ${limit} 
        offset ${offset}
    `);

    return genreRes;
  } catch (error) {
    return [];
  }
}

export async function createGenre(body: IGenre) {
  try {
    const createRes = await query(`
      insert into genre(id, name)
      values('${body.id}', '${body.name}');
    `);

    console.log({ createRes });

    return createRes;
  } catch (error) {
    return false;
  }
}
