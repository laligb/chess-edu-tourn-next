import { apiClient } from "./apiClient";
import { fetchUserById } from "./userService";

export const fetchGames = async () => {
  const games = await apiClient.get("/games");
  return Promise.all(
    games.data.map(async (game: { playerOne: string; playerTwo: string }) => {
      const playerOne = await fetchUserById(game.playerOne);
      const playerTwo = await fetchUserById(game.playerTwo);
      return { ...game, playerOne, playerTwo };
    })
  );
};

export const fetchGameById = async (id: string) => {
  const game = await apiClient.get(`/games/${id}`);
  const playerOne = await fetchUserById(game.data.playerOne);
  const playerTwo = await fetchUserById(game.data.playerTwo);
  return { ...game, playerOne, playerTwo };
};
