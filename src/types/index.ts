// /src/types/index.ts
export type Tournament = {
  id: string;
  title: string;
  players: string[];
  games: string[];
};

export type Game = {
  id: string;
  pgn: string;
  playerOne: string;
  playerTwo: string;
  result: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};
