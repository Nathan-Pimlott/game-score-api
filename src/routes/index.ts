import { Express } from 'express';

// Consumer Handlers
import { getFeaturedScoresHandler } from '../handlers/consumer/getFeaturedScores';
import { getScoreHandler } from '../handlers/consumer/getScore';
import { searchScoreHandler } from '../handlers/consumer/searchScore';
import { getScoresByLetterHandler } from '../handlers/consumer/getScoresByLetter';
import { getConsumerGenresHandler } from '../handlers/consumer/getGenres';
import { getPlatformsHandler } from '../handlers/consumer/getPlatforms';
// Admin Handlers
import { createScoreHandler } from '../handlers/admin/score/createScore';
import { getAdminScoresHandler } from '../handlers/admin/score/getScores';
import { getAdminScoreHandler } from '../handlers/admin/score/getScore';
import { getAdminScoreCountHandler } from '../handlers/admin/score/getScoreCount';
import { updateScoreHandler } from '../handlers/admin/score/updateScore';

import { createGenreHandler } from '../handlers/admin/genre/createGenre';
import { getAdminGenresHandler } from '../handlers/admin/genre/getGenres';
import { getAdminGenreHandler } from '../handlers/admin/genre/getGenre';
import { getAdminGenreCountHandler } from '../handlers/admin/genre/getGenreCount';

import { createPlatformHandler } from '../handlers/admin/platform/createPlatform';
import { getAdminPlatformsHandler } from '../handlers/admin/platform/getPlatforms';
import { getAdminPlatformHandler } from '../handlers/admin/platform/getPlatform';
import { getAdminPlatformCountHandler } from '../handlers/admin/platform/getPlatformCount';

import { createThoughtHandler } from '../handlers/admin/thought/createThought';
import { getAdminThoughtsHandler } from '../handlers/admin/thought/getThoughts';
import { updateAdminThoughtHandler } from '../handlers/admin/thought/updateThought';

import { getAdminSearchScoresHandler } from '../handlers/admin/search/searchScores';
import { getAdminSearchScoreCountHandler } from '../handlers/admin/search/getScoreCount';

// Validation
import { middleware } from './middleware';
import { validate } from '../utils/validate';
import {
  createGenreSchema,
  createPlatformSchema,
  createScoreSchema,
  createThoughtSchema,
} from '../utils/schema';
import { updateGenreHandler } from '../handlers/admin/genre/updateGenre';
import { updatePlatformHandler } from '../handlers/admin/platform/updatePlatform';
import { deletePlatformHandler } from '../handlers/admin/platform/deletePlatform';
import { deleteGenreHandler } from '../handlers/admin/genre/deleteGenre';

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
  app.get('/admin/scores', getAdminScoresHandler);
  app.get('/admin/score/count', getAdminScoreCountHandler);
  app.get('/admin/score/:scoreId', getAdminScoreHandler);
  app.post('/admin/score', validate(createScoreSchema), createScoreHandler);
  app.put('/admin/score', updateScoreHandler);

  app.get('/admin/genres', getAdminGenresHandler);
  app.get('/admin/genre/count', getAdminGenreCountHandler);
  app.get('/admin/genre/:genreId', getAdminGenreHandler);
  app.post('/admin/genre', validate(createGenreSchema), createGenreHandler);
  app.put('/admin/genre', updateGenreHandler);
  app.delete('/admin/genre/:genreId', deleteGenreHandler);

  app.get('/admin/platforms', getAdminPlatformsHandler);
  app.get('/admin/platform/count', getAdminPlatformCountHandler);
  app.get('/admin/platform/:platformId', getAdminPlatformHandler);
  app.post(
    '/admin/platform',
    validate(createPlatformSchema),
    createPlatformHandler
  );
  app.put('/admin/platform', updatePlatformHandler);
  app.delete('/admin/platform/:platformId', deletePlatformHandler);

  app.get('/admin/thoughts/:scoreId', getAdminThoughtsHandler);
  app.post(
    '/admin/thought',
    validate(createThoughtSchema),
    createThoughtHandler
  );
  app.put('/admin/thought', updateAdminThoughtHandler);

  app.get('/admin/search/count', getAdminSearchScoreCountHandler);
  app.get('/admin/search', getAdminSearchScoresHandler);
}
