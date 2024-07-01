import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
routes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
