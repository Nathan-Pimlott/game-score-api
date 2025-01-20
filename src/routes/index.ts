import { Express } from 'express';
import { middleware } from './middleware';

// Handlers
import { getScores } from '../handlers/getScores';
import { getScore } from '../handlers/getScore';
import { createScore } from '../handlers/createScore';

export function routes(app: Express) {
  middleware(app);
  app.get('/scores', getScores);
  app.get('/score', getScore);
  app.post('/score', createScore);
}
