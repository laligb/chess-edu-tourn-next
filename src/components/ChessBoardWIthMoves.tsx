import { Box, Typography } from "@mui/material";
import MoveList from "@/components/MoveList";
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
        flexDirection: "row",
        borderRadius: "8px",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        maxWidth: "900px",
        margin: "auto",
        border: "20px solid white",
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          minWidth: "400px",
          minHeight: "400px",

          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          {chessBoard || "Chessboard Not Available"}
        </Box>
      </Box>

      <Box
        sx={{
          width: "300px",
          height: "500px",

          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">
            {player1} vs {player2}
          </Typography>
          <Typography variant="body1" color="gray">
            {result || "Game in Progress"}
          </Typography>
        </Box>
        <MoveList moves={moves} />
      </Box>
    </Box>
  );
}

export default ChessBoardWithMoves;
