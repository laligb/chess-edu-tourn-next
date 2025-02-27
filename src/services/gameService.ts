import { apiClient } from "./apiClient";
import { fetchUserById } from "./userService";

export const fetchGames = async () => {
  const { data: games } = await apiClient.get("/games"); // ✅ Only one API request

  console.log("Raw API response:", games); // ✅ Only logs once

  // ✅ Fetch player details efficiently using Promise.all()
  const playersMap = new Map();

  return Promise.all(
    games.map(
      async (game: {
        playerOne: string;
        playerTwo: string;
        _id: string;
        pgn: string;
      }) => {
        if (!playersMap.has(game.playerOne)) {
          playersMap.set(game.playerOne, await fetchUserById(game.playerOne));
        }
        if (!playersMap.has(game.playerTwo)) {
          playersMap.set(game.playerTwo, await fetchUserById(game.playerTwo));
        }

        return {
          _id: game._id,
          pgn: game.pgn,
          playerOne: playersMap.get(game.playerOne),
          playerTwo: playersMap.get(game.playerTwo),
        };
      }
    )
  );
};

export const fetchGameById = async (id: string) => {
  const { data } = await apiClient.get(`/games/${id}`);

  // ✅ Fetch both players in parallel
  const [playerOne, playerTwo] = await Promise.all([
    fetchUserById(data.playerOne),
    fetchUserById(data.playerTwo),
  ]);

  return { ...data, playerOne, playerTwo };
};
