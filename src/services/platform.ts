import { query } from '../utils/db';

export async function getPlatforms() {
  try {
    return await query(`
      select p.id, p.name, sp.scoreId, s.name scoreName, s.score, s.finishDate
      from platform p 
      join score_platforms sp on p.id = sp.platformId 
      join score s on s.id = sp.scoreId;
    `);
  } catch (error) {
    return [];
  }
}

export async function getPlatformsForScore(scoreId: string) {
  try {
    return await query(`
      select p.* from platform p
      join score_platforms sp on sp.platformId = p.id
      where sp.scoreId = '${scoreId}';
    `);
  } catch (error) {
    return [];
  }
}
