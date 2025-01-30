import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { sortAsc } from '../utils/sort';
import {
  IGenre,
  IPlatform,
  IScore,
  IThoughtToCreate,
  Platform,
} from '../types';

export async function formatFeaturedScores(ungroupedScores: any[]) {
  try {
    const groupedScores = _.groupBy(ungroupedScores, 'id');

    return Object.keys(groupedScores).map((id) => {
      const { name, score, timeToComplete, finishDate } = groupedScores[id][0];

      return {
        id,
        name,
        score,
        timeToComplete,
        finishDate,
        playedPlatforms: sortAsc(
          // This is a filter instead of map to handle cases where there
          // is no platform for a score.
          groupedScores[id].filter(({ platformId, platformName }) => {
            if (platformId && platformName)
              return {
                id: platformId,
                name: platformName,
              };
          }),
          'name'
        ),
      };
    });
  } catch (error) {
    return [];
  }
}

export async function formatGenres(ungroupedGenres: any[]) {
  try {
    const groupedGenres = _.groupBy(ungroupedGenres, 'id');

    return Object.keys(groupedGenres).map((id) => ({
      id,
      name: groupedGenres[id][0].name,
      featuredScores: sortAsc(
        groupedGenres[id].filter(
          ({ scoreId, scoreName, score, finishDate }) => {
            if (scoreId)
              return {
                id: scoreId,
                name: scoreName,
                score,
                finishDate,
              };
          }
        ),
        'name'
      ),
    }));
  } catch (error) {
    return [];
  }
}

export async function formatPlatforms(ungroupedPlatforms: any[]) {
  const groupedPlatforms = _.groupBy(ungroupedPlatforms, 'id');

  return Object.keys(groupedPlatforms).map((id) => ({
    id,
    name: groupedPlatforms[id][0].name,
    featuredScores: sortAsc(
      groupedPlatforms[id].filter(
        ({ scoreId, scoreName, score, finishDate }) => {
          if (scoreId)
            return {
              id: scoreId,
              name: scoreName,
              score,
              finishDate,
            };
        }
      ),
      'name'
    ),
  }));
}

export async function formatScores(ungroupedScores: any[]) {
  const groupedScores = _.groupBy(ungroupedScores, 'id');

  return Object.keys(groupedScores).map((id) => {
    const { name, score, timeToComplete, finishDate } = groupedScores[id][0];

    return {
      id,
      name,
      score,
      timeToComplete,
      finishDate,
      playedPlatforms: sortAsc(
        groupedScores[id].filter(({ platformId, platformName }) => {
          if (platformId)
            return {
              id: platformId,
              name: platformName,
            };
        }),
        'name'
      ),
    };
  });
}

export async function formstScoreToCreate(
  unformattedScore: any
): Promise<IScore | false> {
  try {
    return {
      id: uuid(),
      name: unformattedScore.name,
      score: unformattedScore.score,
      timeToComplete: unformattedScore.timeToComplete,
      finishDate: unformattedScore.finishDate,
      genres: unformattedScore.genres,
      playedPlatforms: unformattedScore.playedPlatforms,
      thoughts: unformattedScore.thoughts,
    };
  } catch (error) {
    return false;
  }
}

export async function formatGenreToCreate(body: {
  name: string;
}): Promise<IGenre | false> {
  try {
    return {
      id: uuid(),
      name: body.name,
    };
  } catch (error) {
    return false;
  }
}

export async function formatPlatformToCreate(body: {
  name: Platform;
}): Promise<IPlatform | false> {
  try {
    return {
      id: uuid(),
      name: body.name,
    };
  } catch (error) {
    return false;
  }
}

export async function formatScoreToCreate(
  body: any
): Promise<[IScore, string[], string[]] | false> {
  try {
    const score: IScore = {
      id: uuid(),
      name: body.name,
      score: body.score,
      timeToComplete: body.timeToComplete,
      finishDate: body.finishDate,
    };
    const { playedPlatforms, genres } = body;

    return [score, playedPlatforms || [], genres || []];
  } catch (error) {
    return false;
  }
}

export async function formatThoughtToCreate(thought: IThoughtToCreate) {
  try {
    return {
      id: uuid(),
      scoreId: thought.scoreId,
      title: thought.title,
      body: thought.body.toString(),
      priority: thought.priority,
    };
  } catch (error) {
    return false;
  }
}
