"use client";

import React from "react";
import TournamentTable from "@/components/tournaments/TournamentTable";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import TournamentCalendar from "@/components/tournaments/TournamentCalendar";
import TournamentStatistics from "@/components/tournaments/TournamentStatistics";
import useTournFetches from "@/hooks/useTournFetches";

export default function TournamentArrange() {
  const { tournaments, userJoinedTournaments, handleJoinWithdraw, loading } =
    useTournFetches();

  return (
    <Box sx={{}}>
      <Typography
        variant="h4"
        sx={{
          mb: 6,
          mt: 10,
          fontWeight: "bold",
          color: "#1976D2",
          textAlign: "center",
        }}
      ></Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : tournaments.length > 0 ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <TournamentTable
              tournaments={tournaments}
              userJoinedTournaments={userJoinedTournaments}
              handleJoinWithdraw={handleJoinWithdraw}
            />
          </Grid>

          <Grid item xs={12} md={4} container spacing={1}>
            {/* <Grid item xs={12}>
              <TournamentCalendar tournaments={tournaments} />
            </Grid> */}
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
