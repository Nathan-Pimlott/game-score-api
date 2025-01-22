export type Platform = 'Switch' | 'Steam' | 'DS' | 'PS4' | 'Gameboy';

export interface IScoreCompact {
  id: string;
  name: string;
  score: number;
  finishDate: string;
  playedPlatforms: IPlatform[];
  genres?: IGenre[];
}

export interface IScore extends IScoreCompact {
  timeToComplete: number;
  thoughts?: IThoughts[];
}

export interface IGenre {
  id: string;
  name: string;
  examples?: { id: string; name: string }[];
}

export interface IPlatform {
  id: string;
  name: Platform;
  featuredScores?: IScore[];
}

export interface IThoughts {
  id: string;
  priority: number;
  title: string;
  body: string;
}
