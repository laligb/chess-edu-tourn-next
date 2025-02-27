import { fetchGames, fetchGameById } from "@/services/gameService";
import { fetchUserById } from "@/services/userService";
import { Game, User } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGamesThunk = createAsyncThunk<
  Game[],
  void,
  { rejectValue: string }
>("game/fetchGames", async (_, { rejectWithValue }) => {
  try {
    return await fetchGames();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const fetchGameThunkById = createAsyncThunk<
  Game,
  string,
  { rejectValue: string }
>("game/fetchGameById", async (gameId, { rejectWithValue }) => {
  try {
    const game = await fetchGameById(gameId);

    const [playerOne, playerTwo]: [User, User] = await Promise.all([
      fetchUserById(game.playerOne._id),
      fetchUserById(game.playerTwo._id),
    ]);

    return {
      ...game,
      playerOne: { ...game.playerOne, name: playerOne.name },
      playerTwo: { ...game.playerTwo, name: playerTwo.name },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});
