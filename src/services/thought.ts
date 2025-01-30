import { IThought } from '../types';
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

export async function createThought({ id, title, body, priority }: IThought) {
  try {
    return await query(`
        insert into thought(id, title, body, priority)
        values(uuid(), '${id}', '${title}', '${body}', '${priority}');
    `);
  } catch (error) {
    return [];
  }
}

export async function createScoreThoughtLink(
  scoreId: string,
  thoughtId: string
) {
  try {
    return await query(`
        insert into score_thoughts(id, scoreId, thoughtId)
        values(uuid(), '${scoreId}', '${thoughtId}');
    `);
  } catch (error) {
    return [];
  }
}
