"use client";

import { useEffect, useState } from "react";
import { fetchTournaments } from "@/services/tournamentService";
import TournamentTable from "@/components/TournamentTable";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
        <Grid container spacing={4}>
          {/* Left Column: Tournament List */}
          <Grid item xs={12} md={8}>
            <TournamentTable tournaments={tournaments} />
          </Grid>

          {/* Right Column: Calendar, Statistics, and Map */}
          <Grid item xs={12} md={4} container spacing={2}>
            <Grid item xs={12}>
              <TournamentCalendar tournaments={tournaments} />
            </Grid>
            <Grid item xs={12}>
              <TournamentStatistics tournaments={tournaments} />
            </Grid>
            <Grid item xs={12}>
              <TournamentMap tournaments={tournaments} />
            </Grid>
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
