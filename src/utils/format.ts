import _ from 'lodash';
import { sortAsc } from '../utils/sort';

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
          groupedScores[id].map(({ platformId, platformName }) => ({
            id: platformId,
            name: platformName,
          })),
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
        groupedGenres[id].map(({ scoreId, scoreName, score, finishDate }) => ({
          id: scoreId,
          name: scoreName,
          score,
          finishDate,
        })),
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
      groupedPlatforms[id].map(({ scoreId, scoreName, score, finishDate }) => ({
        id: scoreId,
        name: scoreName,
        score,
        finishDate,
      })),
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
        groupedScores[id].map(({ platformId, platformName }) => ({
          id: platformId,
          name: platformName,
        })),
        'name'
      ),
    };
  });
}
