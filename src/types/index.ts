// /src/types/index.ts
export type Tournament = {
  _id: string;
  title: string;
  players: string[];
  games: string[];
};

export type Game = {
  _id: string;
  pgn: string;
  playerOne: User;
  playerTwo: User;
  result: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};
