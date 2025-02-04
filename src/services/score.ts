import { v4 as uuid } from 'uuid';

import { IScore } from '../types';
import { query } from '../utils/db';

export async function getScore(scoreId: string) {
  try {
    const scoreRes = await query(`
          select *
          from score s
          where s.id = '${scoreId}';
      `);
    if (scoreRes.length > 0) {
      return scoreRes[0];
    }
    throw Error('Unable to find score by id.');
  } catch (error) {
    return null;
  }
}

export async function getFeaturedScores() {
  try {
    const res = await query(`
      select s.*, p.id platformId, p.name platformName 
      from score s
      join score_platforms sp on sp.scoreId = s.id
      join platform p on p.id = sp.platformId
      order by s.finishDate desc
      limit 10;
    `);

    return res;
  } catch (error) {
    return [];
  }
}

export async function getScoresByLetter(letter: string) {
  try {
    return await query(`
      select s.*, p.id platformId, p.name platformName 
      from score s
      join score_platforms sp ON sp.scoreId = s.id
      join platform p on p.id = sp.platformId
      where s.name like '${letter}%'
      order by s.name asc
      limit 10;
    `);
  } catch (error) {
    return [];
  }
}

export async function getScoresBySearchText(searchText: string) {
  try {
    return await query(`
      select s.*, p.id platformId, p.name platformName 
      from score s
      join score_platforms sp ON sp.scoreId = s.id
      join platform p on p.id = sp.platformId
      where s.name like '%${searchText}%'
      order by s.name asc
      limit 10;
    `);
  } catch (error) {
    return [];
  }
}

export async function createScore(scoreToCreate: IScore) {
  try {
    const { id, name, score, timeToComplete, finishDate } = scoreToCreate;

    return await query(`
      insert into score(id, name, score, timeToComplete, finishDate)
      values(
        '${id}',
        '${name}',
        '${score}',
        '${timeToComplete}',
        '${finishDate}'
      )
    `);
  } catch (error) {
    return false;
  }
}

export async function updateScore(
  scoreToUpdate: IScore,
  genres: string[],
  platforms: string[]
) {
  try {
    const { id, name, score, timeToComplete, finishDate } = scoreToUpdate;

    await query(`
      update score
      set 
        id = '${id}',
        name = '${name}',
        score = '${score}',
        timeToComplete = '${timeToComplete}',
        finishDate = '${finishDate}'
      where id = '${id}';
    `);

    await query(`delete from score_genres where scoreId = '${id}';`);
    await query(`delete from score_platforms where scoreId = '${id}';`);

    let scoreGenreQuery = `
        insert ignore into score_genres (scoreId, genreId)
        values 
    `;
    genres.map(
      (g, idx) =>
        (scoreGenreQuery += `${idx !== 0 ? ', ' : ''}('${id}', '${g}')`)
    );

    let scorePlatformQuery = `
        insert ignore into score_platforms (scoreId, platformId)
        values 
    `;
    platforms.map(
      (p, idx) =>
        (scorePlatformQuery += `${idx !== 0 ? ', ' : ''}('${id}', '${p}')`)
    );

    await query(scoreGenreQuery);
    await query(scorePlatformQuery);

    return true;
  } catch (error) {
    return false;
  }
}

export async function createScorePlatformsLink(
  scoreId: string,
  platformIds: string[]
) {
  try {
    return await Promise.all(
      platformIds.map(async (platformId) => {
        await query(`
        insert into score_platforms(scoreId, platformId)
        values(
          '${scoreId}',
          '${platformId}'
        )
      `);
      })
    );
  } catch (error) {
    return false;
  }
}

export async function createScoreGenresLink(
  scoreId: string,
  genreIds: string[]
) {
  try {
    return await Promise.all(
      genreIds.map(async (genreId) => {
        await query(`
        insert into score_genres(scoreId, genreId)
        values(
          '${scoreId}',
          '${genreId}'
        )
      `);
      })
    );
  } catch (error) {
    return false;
  }
}

export async function getScores(
  limit: number,
  offset: number,
  sortBy: string,
  order: string
) {
  try {
    const scoreRes = await query(`
      select * from score 
      order by ${sortBy} ${order}
      limit ${limit} 
      offset ${offset}
  `);

    return scoreRes;
  } catch (error) {
    return [];
  }
}

export async function getAdminScore(id: string) {
  try {
    const scoreRes = await query(`
      select * from score 
      where id = '${id}'
      limit 1;
  `);

    const genreRes = await query(`
    select g.* from genre g
    join score_genres sg on sg.genreId = g.id
    where sg.scoreId = '${id}';
  `);

    const platformRes = await query(`
    select p.* from platform p
    join score_platforms sp on sp.platformId = p.id
    where sp.scoreId = '${id}';
  `);

    // This needs to add a load more stuff in.

    return {
      ...scoreRes[0],
      genres: genreRes,
      playedPlatforms: platformRes,
    };
  } catch (error) {
    return null;
  }
}

export async function getScoreCount(): Promise<number> {
  try {
    const countRes = await query('select count(*) as count from score;');

    return countRes[0].count;
  } catch (error) {
    return 0;
  }
}

export async function getSearchCount(searchText: string): Promise<number> {
  try {
    const countRes = await query(`
      select count(*) as count 
      from score 
      where name like '%${searchText}%';
    `);

    return countRes[0].count;
  } catch (error) {
    return 0;
  }
}

export async function getAdminScoresBySearchText(
  searchText: string,
  limit: number,
  offset: number,
  sortBy: string,
  order: string
) {
  try {
    return await query(`
      select *
      from score
      where name like '%${searchText}%'
      order by ${sortBy} ${order}
      limit ${limit} 
      offset ${offset}
    `);
  } catch (error) {
    return [];
  }
}
