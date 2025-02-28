import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Tournament } from "@/types";

type TournamentTableProps = {
  tournaments: Tournament[];
};

export default function TournamentTable({ tournaments }: TournamentTableProps) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
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
              key={tournament._id}
              sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}
            >
              <TableCell component="th" scope="row">
                {tournament.title}
              </TableCell>
              <TableCell align="right">{tournament.players.length}</TableCell>
              <TableCell align="right">{tournament.games.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
