import { query } from '../utils/db';

export async function getGenres() {
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
