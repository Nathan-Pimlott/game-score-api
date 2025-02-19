import { z } from 'zod';

// THOUGHTS

export const createThoughtSchema = z.object({
  body: z
    .object({
      scoreId: z.string().uuid(),
      title: z.string().max(255).min(2),
      body: z.string().min(5).max(10000),
      priority: z.number().min(1).max(99),
    })
    .strict(),
});

// GENRES

export const genreSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(2).max(100),
  })
  .strict();

export const createGenreSchema = z.object({
  body: z
    .object({
      name: z.string().min(2).max(100),
    })
    .strict(),
});

// PLATFORMS

export const platformSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(2).max(100),
  })
  .strict();

export const createPlatformSchema = z.object({
  body: z
    .object({
      name: z.string().min(2).max(100),
    })
    .strict(),
});

// SCORES

export const createScoreSchema = z.object({
  body: z
    .object({
      name: z.string().min(2).max(100),
      score: z.number().min(1).max(10),
      timeToComplete: z.number().min(1).max(200),
      finishDate: z.string().date(),
      playedPlatforms: z.array(z.string().uuid()).min(1),
      genres: z.array(z.string().uuid()).min(1),
      // thoughts: z.array(createThoughtSchema),
    })
    .strict(),
});
