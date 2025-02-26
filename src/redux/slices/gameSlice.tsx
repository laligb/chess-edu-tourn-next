import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchGames } from "../../services/gameService"; // ✅ Import service function
import { RootState } from "../store";
import { Game } from "../../types";

interface GamesState {
  list: Game[];
  loading: boolean;
  error: string | null;
}

// ✅ Initial state
const initialState: GamesState = {
  list: [],
  loading: false,
  error: null,
};

// ✅ Use service function inside Redux Thunk
export const fetchGamesThunk = createAsyncThunk<
  Game[],
  void,
  { rejectValue: string }
>("games/fetchGames", async (_, { rejectWithValue }) => {
  try {
    return await fetchGames(); // ✅ Calls service function instead of direct fetch
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

// ✅ Redux Slice
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
          state.list = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchGamesThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// ✅ Export actions and reducer
export const { clearGames } = gameSlice.actions;
export default gameSlice.reducer;

// ✅ Selectors
export const selectGames = (state: RootState) => state.games.list;
export const selectLoading = (state: RootState) => state.games.loading;
export const selectError = (state: RootState) => state.games.error;
