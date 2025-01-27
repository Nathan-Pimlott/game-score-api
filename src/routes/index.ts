import { Express } from 'express';

// Handlers
import { getFeaturedScoresHandler } from '../handlers/consumer/getFeaturedScores';
import { getScoreHandler } from '../handlers/consumer/getScore';
import { searchScoreHandler } from '../handlers/consumer/searchScore';
import { getScoresByLetterHandler } from '../handlers/consumer/getScoresByLetter';
import { getConsumerGenresHandler } from '../handlers/consumer/getGenres';
import { getPlatformsHandler } from '../handlers/consumer/getPlatforms';
import { createScoreHandler } from '../handlers/admin/createScore';
import { createPlatformHandler } from '../handlers/admin/createPlatform';
import { createGenreHandler } from '../handlers/admin/createGenre';
// Validation
import { middleware } from './middleware';
import { validate } from '../utils/validate';
import {
  createGenreSchema,
  createPlatformSchema,
  createScoreSchema,
} from '../utils/schema';
import { getAdminGenresHandler } from '../handlers/admin/getGenres';

export function routes(app: Express) {
  middleware(app);
  // Customer endpoints
  app.get('/consumer/score/:id', getScoreHandler);
  app.get('/consumer/featured-scores', getFeaturedScoresHandler);
  app.get('/consumer/scores-by-letter/:letter', getScoresByLetterHandler);
  app.get('/consumer/genres', getConsumerGenresHandler);
  app.get('/consumer/platforms', getPlatformsHandler);
  app.get('/consumer/search', searchScoreHandler);
  // Admin endpoints
  app.get('/admin/genres', getAdminGenresHandler);
  app.post('/admin/score', validate(createScoreSchema), createScoreHandler);
  app.post('/admin/genre', validate(createGenreSchema), createGenreHandler);
  app.post(
    '/admin/platform',
    validate(createPlatformSchema),
    createPlatformHandler
  );
}
