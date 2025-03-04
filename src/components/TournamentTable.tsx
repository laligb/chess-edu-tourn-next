import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GroupIcon from "@mui/icons-material/Group";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Tournament } from "@/types";

type TournamentTableProps = {
  tournaments: Tournament[];
};

export default function TournamentTable({ tournaments }: TournamentTableProps) {
  const handleJoin = (tournamentId: string) => {
    console.log(`Joining tournament with ID: ${tournamentId}`);
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}
    >
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 4,
          borderRadius: 3,
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            my: 2,
            fontWeight: "bold",
            color: "#1976D2",
          }}
        >
          Ongoing Tournaments
        </Typography>

        <Table aria-label="tournament table">
          <TableHead sx={{ backgroundColor: "#1976D2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                City
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Players
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Games
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Actions
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Join
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments.map((tournament) => (
              <TableRow
                key={tournament._id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography fontWeight="bold">{tournament.title}</Typography>
                </TableCell>
                <TableCell>{tournament.city}</TableCell>
                <TableCell>
                  {new Date(tournament.date).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <GroupIcon color="primary" />
                    {tournament.players.length}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <SportsEsportsIcon color="secondary" />
                    {tournament.games.length}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    onClick={() =>
                      console.log(
                        `Viewing tournament with ID: ${tournament._id}`
                      )
                    }
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleJoin(tournament._id)}
                  >
                    Join
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
