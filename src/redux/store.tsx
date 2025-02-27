import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./slices/games/gameSlice";

export const store = configureStore({
  reducer: {
    game: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type GameDispatch = typeof store.dispatch;
