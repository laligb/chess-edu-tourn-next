import { Box, Typography } from "@mui/material";

const chessSymbols: { [key: string]: string } = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "",
  x: "×",
  "+": "†",
  "#": "‡",
};

interface MoveListProps {
  moves: string[];
}

export default function MoveList({ moves }: MoveListProps) {
  if (!moves || moves.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{ textAlign: "center", color: "gray", mt: 2 }}
      >
        No moves available
      </Typography>
    );
  }

  const formatMove = (move: string) =>
    move
      .split("")
      .map((char) => chessSymbols[char] || char)
      .join("");

  return (
    <Box sx={{ paddingX: 2 }}>
      {moves.map((move, index) => (
        <Typography
          key={index}
          sx={{
            fontSize: "16px",
            paddingX: "5px",
            display: "inline-block",
            color: index % 2 === 0 ? "primary.main" : "secondary.main",
            fontWeight: index % 2 === 0 ? "bold" : "normal",
          }}
        >
          {index % 2 === 0 ? `${Math.floor(index / 2) + 1}.` : ""}{" "}
          {formatMove(move)}
        </Typography>
      ))}
    </Box>
  );
}
