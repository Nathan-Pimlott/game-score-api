export interface IScoreToCreate {
  name: string;
  score: number;
  timeToComplete: string;
  finishDate: string;
  playedConsoles: Console[];
  thoughts: string;
}

export interface IScore extends IScoreToCreate {
  id: string;
}

export type Console = 'Switch' | 'PC' | 'SteamDeck' | 'DS' | 'PS4' | 'Gameboy';
