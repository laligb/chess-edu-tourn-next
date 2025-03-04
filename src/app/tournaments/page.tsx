"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchTournaments,
  joinTournament,
  withdrawTournament,
} from "@/services/tournamentService";
import TournamentTable from "@/components/TournamentTable";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TournamentCalendar from "@/components/TournamentCalendar";
import TournamentStatistics from "@/components/TournamentStatistics";
import { Tournament } from "@/types";
import { RootState } from "@/redux/store";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [userJoinedTournaments, setUserJoinedTournaments] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchTournaments()
      .then((data: Tournament[]) => {
        setTournaments(data);
        if (user) {
          const joinedTournaments = data
            .filter((tournament) => tournament.players.includes(user._id))
            .map((tournament) => tournament._id);
          setUserJoinedTournaments(joinedTournaments);
        }
      })
      .catch((error) => console.error("Error fetching tournaments:", error))
      .finally(() => setLoading(false));
  }, [user]);

  const fetchUpdatedTournaments = async () => {
    try {
      const data = await fetchTournaments();
      setTournaments(data);
    } catch (error) {
      console.error("Error fetching updated tournaments:", error);
    }
  };

  const handleJoinWithdraw = async (tournamentId: string) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const isJoined = userJoinedTournaments.includes(tournamentId);
    const userId = user._id;

    try {
      if (isJoined) {
        await withdrawTournament(tournamentId, userId);
        setUserJoinedTournaments((prevState) =>
          prevState.filter((id) => id !== tournamentId)
        );
      } else {
        await joinTournament(tournamentId, userId);
        setUserJoinedTournaments((prevState) => [...prevState, tournamentId]);
      }
      await fetchUpdatedTournaments();
    } catch (error) {
      console.error("Error in join/withdraw:", error);
    }
  };

  return (
    <Box sx={{}}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#1976D2",
          textAlign: "center",
        }}
      >
        Tournament Overview
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : tournaments.length > 0 ? (
        <Grid container spacing={2}>
          {/* Left Column: Tournament List */}
          <Grid item xs={12} md={8}>
            <TournamentTable
              tournaments={tournaments}
              userJoinedTournaments={userJoinedTournaments}
              handleJoinWithdraw={handleJoinWithdraw} // Pass the updated function
            />
          </Grid>

          {/* Right Column: Calendar, Statistics */}
          <Grid item xs={12} md={4} container spacing={1}>
            <Grid item xs={12}>
              <TournamentCalendar tournaments={tournaments} />
            </Grid>
            <Grid item xs={12}>
              {/* TournamentMap */}
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <TournamentStatistics tournaments={tournaments} />
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" textAlign="center">
          No tournaments found.
        </Typography>
      )}
    </Box>
  );
}
