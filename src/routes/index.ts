import { Express } from 'express';
import { middleware } from './middleware';

// Handlers
import { getFeaturedScoresHandler } from '../handlers/getFeaturedScores';
import { getScoreHandler } from '../handlers/getScore';
import { searchScoreHandler } from '../handlers/searchScore';
import { getScoresByLetterHandler } from '../handlers/getScoresByLetter';
import { getGenresHandler } from '../handlers/getGenres';
import { getPlatformsHandler } from '../handlers/getPlatforms';
import { createScoreHandler } from '../handlers/createScore';

export function routes(app: Express) {
  middleware(app);
  // Customer endpoints
  app.get('/score/:id', getScoreHandler);
  app.get('/featured-scores', getFeaturedScoresHandler);
  app.get('/scores-by-letter/:letter', getScoresByLetterHandler);
  app.get('/genres', getGenresHandler);
  app.get('/platforms', getPlatformsHandler);
  app.get('/search', searchScoreHandler);
  // Admin endpoints
  app.post('/score', createScoreHandler);
}
