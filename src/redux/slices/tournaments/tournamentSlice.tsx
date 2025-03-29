import { Tournament } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TournamentState {
  tournaments: Tournament[];
  userJoinedTournaments: string[];
}

const initialState: TournamentState = {
  tournaments: [],
  userJoinedTournaments: [],
};

const tournamentSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    setTournaments: (state, action: PayloadAction<Tournament[]>) => {
      state.tournaments = action.payload;
    },
    joinTournament: (state, action: PayloadAction<string>) => {
      state.userJoinedTournaments.push(action.payload);
    },
    withdrawTournament: (state, action: PayloadAction<string>) => {
      state.userJoinedTournaments = state.userJoinedTournaments.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { setTournaments, joinTournament, withdrawTournament } =
  tournamentSlice.actions;

export const selectTournaments = (state: { tournaments: TournamentState }) =>
  state.tournaments?.tournaments || [];
export const selectUserJoinedTournaments = (state: {
  tournaments: TournamentState;
}) => state.tournaments?.userJoinedTournaments || [];

export default tournamentSlice.reducer;
