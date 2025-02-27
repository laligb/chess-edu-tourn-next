import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGames, fetchGameById } from "@/services/gameService";
import { Game } from "@/types";

// ✅ Fetch all games
export const fetchGamesThunk = createAsyncThunk<
  Game[],
  void,
  { rejectValue: string }
>("games/fetchGames", async (_, { rejectWithValue }) => {
  try {
    return await fetchGames();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// ✅ Fetch a single game by ID
export const fetchGameByIdThunk = createAsyncThunk<
  Game,
  string,
  { rejectValue: string }
>("games/fetchGameById", async (id, { rejectWithValue }) => {
  try {
    return await fetchGameById(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Game not found");
  }
});
