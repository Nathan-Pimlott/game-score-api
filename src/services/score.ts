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

export async function createScorePlatformsLink(
  scoreId: string,
  platformIds: string[]
) {
  try {
    return await Promise.all(
      platformIds.map(async (platformId) => {
        await query(`
        insert into score_platforms(id, scoreId, platformId)
        values(
          '${uuid()}',
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
        insert into score_genres(id, scoreId, genreId)
        values(
          '${uuid()}',
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
