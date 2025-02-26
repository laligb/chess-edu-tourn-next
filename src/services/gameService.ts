import { apiClient } from "./apiClient";
import { fetchUserById } from "./userService";

export const fetchGames = async () => {
  const games = await apiClient.get("/games");

  const { data } = await apiClient.get("/games");

  console.log("Raw API response:", data);

  return Promise.all(
    games.data.map(
      async (game: {
        playerOne: string;
        playerTwo: string;
        _id: string;
        pgn: string;
      }) => {
        const playerOne = await fetchUserById(game.playerOne);
        const playerTwo = await fetchUserById(game.playerTwo);

        return {
          _id: game._id,
          pgn: game.pgn,
          playerOne,
          playerTwo,
        };
      }
    )
  );
};

export const fetchGameById = async (id: string) => {
  const { data } = await apiClient.get(`/games/${id}`);
  const playerOne = await fetchUserById(data.playerOne);
  const playerTwo = await fetchUserById(data.playerTwo);

  return { ...data, playerOne, playerTwo };
};
