"use client";

import { useEffect, useState } from "react";
import { fetchTournaments } from "@/services/tournamentService";
import TournamentTable from "@/components/TournamentTable";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
    <Box sx={{ width: "50%", margin: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        Tournament List
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : tournaments.length > 0 ? (
        <TournamentTable tournaments={tournaments} />
      ) : (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 2, color: "gray" }}
        >
          No tournaments found.
        </Typography>
      )}
    </Box>
  );
}
