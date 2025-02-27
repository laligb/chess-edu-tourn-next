import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGamesThunk } from "./gameThunk";
import { RootState } from "../../store";
import { Game } from "../../../types";

interface GamesState {
  list: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  list: [],
  loading: false,
  error: null,
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    clearGames: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGamesThunk.fulfilled,
        (state, action: PayloadAction<Game[]>) => {
          if (JSON.stringify(state.list) !== JSON.stringify(action.payload)) {
            state.list = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(fetchGamesThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { clearGames } = gameSlice.actions;
export default gameSlice.reducer;

export const selectGames = (state: RootState) => state.games.list;
export const selectLoading = (state: RootState) => state.games.loading;
export const selectError = (state: RootState) => state.games.error;
