import { Express } from 'express';
import { middleware } from './middleware';

// Handlers
import { getScores } from '../handlers/getScores';
import { createScore } from '../handlers/createScore';

export function routes(app: Express) {
  middleware(app);
  app.get('/scores', getScores);
  app.post('/score', createScore);
}
