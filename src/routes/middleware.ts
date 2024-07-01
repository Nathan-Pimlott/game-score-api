import { authMiddleware } from '../utils/middleware';

export function middleware(app: any) {
  app.use('*', authMiddleware);
}
