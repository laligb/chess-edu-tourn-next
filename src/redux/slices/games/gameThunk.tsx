import { fetchGames } from "@/services/gameService";
import { Game } from "@/types";
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
