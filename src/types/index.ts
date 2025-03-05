// /src/types/index.ts
export type Tournament = {
  date: Date;
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
  photoUrl: string;
  tournaments: string[];
  friends: string[];
  followers: string[];
  following: string[];
  games: string[];
  groups: string[];
};

export type Group = {
  _id: string;
  name: string;
  professor: string;
  students: string[];
};
