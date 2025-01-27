import { query } from '../utils/db';

export async function getThoughtsForScore(scoreId: string) {
  try {
    return await query(`
        select t.* from thought t
        join score_thoughts st on st.thoughtId = t.id
        where st.scoreId = '${scoreId}';
    `);
  } catch (error) {
    return [];
  }
}
