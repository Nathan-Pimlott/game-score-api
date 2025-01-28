import { IPlatform } from '../types';
import { query } from '../utils/db';

export async function getPlatformsWithScores() {
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

export async function getPlatforms(
  limit: number,
  offset: number,
  orderBy: string,
  order: string
) {
  try {
    const platformRes = await query(`
        select 
          g.*, 
          (select count(*) from score_platforms sg where sg.platformId = g.id) as scoreCount
        from platform g
        order by ${orderBy} ${order}
        limit ${limit} 
        offset ${offset}
    `);

    return platformRes;
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

export async function createPlatform(body: IPlatform) {
  try {
    return await query(`
      insert into platform(id, name)
      values('${body.id}', '${body.name}');
    `);
  } catch (error) {
    return false;
  }
}

export async function getAdminPlatform(id: string) {
  try {
    const platformRes = await query(`
      select * from platform 
      where id = '${id}'
  `);

    // This needs to add a load more stuff in.

    return platformRes;
  } catch (error) {
    return null;
  }
}

export async function getPlatformCount(): Promise<number> {
  try {
    const countRes = await query('select count(*) as count from platform;');

    console.log({ countRes });

    return countRes[0].count;
  } catch (error) {
    return 0;
  }
}
