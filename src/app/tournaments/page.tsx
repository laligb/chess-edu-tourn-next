"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { fetchTournaments } from "@/services/tournamentService";
import CircularProgress from "@mui/material/CircularProgress";

type Tournament = {
  id: string;
  title: string;
  players: string[];
  games: string[];
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments()
      .then((data: Tournament[]) => {
        setTournaments(data);
      })
      .catch((error) => console.error("Error fetching tournaments:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
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
        <TableContainer
          component={Paper}
          sx={{ boxShadow: 3, borderRadius: 2 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="tournament table">
            <TableHead sx={{ backgroundColor: "#a61299" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Title
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Players
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Games
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tournaments.map((tournament) => (
                <TableRow
                  key={tournament.id}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}
                >
                  <TableCell component="th" scope="row">
                    {tournament.title}
                  </TableCell>
                  <TableCell align="right">
                    {tournament.players.length}
                  </TableCell>
                  <TableCell align="right">{tournament.games.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
