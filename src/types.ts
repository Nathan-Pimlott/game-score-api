export interface IScoreCompact {
  id: string;
  name: string;
  score: number;
  finishDate: string;
  playedPlatforms?: IPlatform[];
  genres?: IGenre[];
}

export interface IScore extends IScoreCompact {
  timeToComplete: number;
  thoughts?: IThought[];
}

export interface IGenre {
  id: string;
  name: string;
  featuredScores?: IScoreCompact[];
}

export interface IPlatform {
  id: string;
  name: string;
  featuredScores?: IScoreCompact[];
}

export interface IThought {
  id: string;
  priority: number;
  title: string;
  body: string;
}

export type IThoughtToCreate = Omit<IThought, 'id'> & {
  scoreId: string;
};
