"use client";

import { useEffect, useState } from "react";
import { fetchTournaments } from "@/services/tournamentService";
import TournamentTable from "@/components/TournamentTable";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import TournamentCalendar from "@/components/TournamentCalendar";
import TournamentMap from "@/components/TournamentMap";
import TournamentStatistics from "@/components/TournamentStatistics";
import { Tournament } from "@/types";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments()
      .then((data: Tournament[]) => setTournaments(data))
      .catch((error) => console.error("Error fetching tournaments:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
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
      <Grid container spacing={4}>
        <Grid xs={12} md={3}>
          <TournamentCalendar tournaments={tournaments} />
        </Grid>
        <Grid xs={12} md={3}>
          <TournamentStatistics tournaments={tournaments} />
        </Grid>
        <Grid xs={12} md={3}>
          <TournamentMap tournaments={tournaments} />
        </Grid>
      </Grid>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : tournaments.length > 0 ? (
        <Grid container spacing={4}>
          {/* Left Column: Tournament List (Bigger Size) */}
          {/* <Grid xs={12} sm={12} md={8}> */}
          <TournamentTable tournaments={tournaments} />
          {/* </Grid> */}

          {/* Right Column: Calendar (Top), then Stats, then Map */}
        </Grid>
      ) : (
        <Typography variant="h6" textAlign="center">
          No tournaments found.
        </Typography>
      )}
    </Box>
  );
}
