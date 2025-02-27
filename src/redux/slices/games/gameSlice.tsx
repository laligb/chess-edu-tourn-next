import { createSlice } from "@reduxjs/toolkit";
import { fetchGamesThunk, fetchGameThunkById } from "./gameThunk";
import { Game } from "@/types";
import { RootState } from "@/redux/store";

interface GameState {
  games: Game[];
  game: Game | null;
  moves: string[];
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  games: [],
  game: null,
  moves: [],
  loading: false,
  error: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesThunk.fulfilled, (state, action) => {
        state.games = action.payload;
        state.loading = false;
      })
      .addCase(fetchGamesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch games";
      })
      .addCase(fetchGameThunkById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameThunkById.fulfilled, (state, action) => {
        state.game = action.payload;
        state.loading = false;

        state.moves = action.payload.pgn
          .replace(/\[.*?\]/g, "")
          .replace(/\d+\./g, "")
          .trim()
          .split(/\s+/);
      })
      .addCase(fetchGameThunkById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch game by ID";
      });
  },
});

export const selectGames = (state: RootState) => state.game.games;
export const selectLoading = (state: RootState) => state.game.loading;
export const selectGame = (state: RootState) => state.game.game;
export const selectMoves = (state: RootState) => state.game.moves;

export default gameSlice.reducer;
