import { Express } from 'express';
import { middleware } from './middleware';

// Handlers
import { getFeaturedScores } from '../handlers/getFeaturedScores';
import { getScore } from '../handlers/getScore';
import { searchScore } from '../handlers/searchScore';
import { getGenres } from '../handlers/getGenres';
import { getPlatforms } from '../handlers/getPlatforms';
import { createScore } from '../handlers/createScore';

export function routes(app: Express) {
  middleware(app);
  // Customer endpoints
  app.get('/score/:id', getScore);
  app.get('/featured-scores', getFeaturedScores);
  app.get('/scores-by-letter/:letter', getFeaturedScores);
  app.get('/genres', getGenres);
  app.get('/platforms', getPlatforms);
  app.get('/search', searchScore);
  // Admin endpoints
  app.post('/score', createScore);
}
