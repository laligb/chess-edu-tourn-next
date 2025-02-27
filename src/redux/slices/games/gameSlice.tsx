import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGamesThunk, fetchGameThunkById } from "./gameThunk";
import { Game } from "@/types";
import { RootState } from "@/redux/store";
import { Chess, Square } from "chess.js";

interface GameState {
  games: Game[];
  game: Game | null;
  moves: string[];
  loading: boolean;
  fen: string;
  legalMoves: Record<string, string[]>;
  error: string | null;
}

const initialState: GameState = {
  games: [],
  game: null,
  moves: [],
  loading: false,
  fen: "start",
  legalMoves: {},
  error: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateMove: (
      state,
      action: PayloadAction<{ from: string; to: string }>
    ) => {
      if (!state.game) return;

      const chess = new Chess(state.fen);
      const move = chess.move({
        from: action.payload.from,
        to: action.payload.to,
        promotion: "q",
      });

      if (move) {
        state.fen = chess.fen();
        state.moves = chess.history();
      }
    },
    getLegalMoves: (state, action: PayloadAction<{ square: Square }>) => {
      const chess = new Chess(state.fen);
      const legalMoves = chess.moves({
        square: action.payload.square,
        verbose: true,
      });

      if (!legalMoves.length) {
        console.warn(
          `No legal moves for ${action.payload.square} - Possible bug`
        );
      }

      // ✅ Ensure legal moves are correctly stored in Redux
      state.legalMoves[action.payload.square] =
        legalMoves.map((move) => move.to) || [];
    },
  },
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

        const chess = new Chess();
        try {
          chess.loadPgn(action.payload.pgn);
          state.moves = chess.history();
          state.fen = chess.fen();
        } catch (error) {
          console.error("Invalid PGN:", error);
          state.moves = [];
          state.fen = "start";
        }
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
export const selectFen = (state: RootState) => state.game.fen;
export const selectLegalMoves = (state: RootState) => state.game.legalMoves;
export const { updateMove, getLegalMoves } = gameSlice.actions;

export default gameSlice.reducer;
