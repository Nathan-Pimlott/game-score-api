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

export async function getAdminGenre(id: string) {
  try {
    const genreRes = await query(`
      select * from genre 
      where id = '${id}'
  `);

    // This needs to add a load more stuff in.

    return genreRes;
  } catch (error) {
    return null;
  }
}

export async function getAdminGenres(
  limit: number,
  offset: number,
  sortBy: string,
  order: string
) {
  try {
    const scoreRes = await query(`
      select * from genre 
      order by ${sortBy} ${order}
      limit ${limit} 
      offset ${offset}
  `);

    console.log({ scoreRes });

    return scoreRes;
  } catch (error) {
    return [];
  }
}

export async function getGenreCount(): Promise<number> {
  try {
    const countRes = await query('select count(*) as count from genre;');

    console.log({ countRes });

    return countRes[0].count;
  } catch (error) {
    return 0;
  }
}
