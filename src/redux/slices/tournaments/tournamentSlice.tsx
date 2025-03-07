import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tournaments: [],
  userJoinedTournaments: [],
};

const tournamentSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    setTournaments: (state, action) => {
      state.tournaments = action.payload;
    },
    joinTournament: (state, action) => {
      state.userJoinedTournaments.push(action.payload);
    },
    withdrawTournament: (state, action) => {
      state.userJoinedTournaments = state.userJoinedTournaments.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { setTournaments, joinTournament, withdrawTournament } =
  tournamentSlice.actions;

export const selectTournaments = (state) =>
  state.tournaments?.tournaments || [];
export const selectUserJoinedTournaments = (state) =>
  state.tournaments?.userJoinedTournaments || [];

export default tournamentSlice.reducer;
