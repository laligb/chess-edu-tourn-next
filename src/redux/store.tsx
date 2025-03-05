import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./slices/games/gameSlice";
import userReducer from "./slices/users/userSlice";
import tournamentReducer from "./slices/tournaments/tournamentSlice";
import groupReducer from "./slices/groups/groupSlice";

export const store = configureStore({
  reducer: {
    game: gamesReducer,
    user: userReducer,
    tournament: tournamentReducer,
    group: groupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
