import { Box, Typography, Paper } from "@mui/material";
import MoveList from "@/components/games/MoveList";
import { useSelector } from "react-redux";
import { selectMoves } from "@/redux/slices/games/gameSlice";

interface ChessBoardWithMovesProps {
  player1: string;
  player2: string;
  result?: string;
  chessBoard: React.ReactNode;
}

function ChessBoardWithMoves({
  player1,
  player2,
  result,
  chessBoard,
}: ChessBoardWithMovesProps) {
  const moves = useSelector(selectMoves);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: "1000px",
        margin: "auto",
        padding: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "6px 20px",
            borderRadius: "20px",
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: "bold",
            minWidth: "180px",
          }}
        >
          {player2} {result ? (result === "0-1" ? "(1)" : "(0)") : "(*)"}
        </Paper>

        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            aspectRatio: "1",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: 3,
            padding: 1,
          }}
        >
          {chessBoard}
        </Box>

        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "6px 20px",
            borderRadius: "20px",
            backgroundColor: "secondary.main",
            color: "white",
            fontWeight: "bold",
            minWidth: "180px",
          }}
        >
          {player1} {result ? (result === "1-0" ? "(1)" : "(0)") : "(*)"}
        </Paper>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          minWidth: "250px",
          padding: "12px",
          borderRadius: "10px",
          backgroundColor: "background.paper",
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "text.primary",
            marginBottom: 1,
          }}
        >
          Move List
        </Typography>
        <MoveList moves={moves} />
      </Box>
    </Box>
  );
}

export default ChessBoardWithMoves;
