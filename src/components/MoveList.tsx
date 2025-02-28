import { Box, Typography } from "@mui/material";

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

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",

        padding: "10px",
        boxShadow: 2,
        backgroundColor: "#f9f9f9",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2, color: "black" }}
      >
        Move List
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
        }}
      >
        {moves.map((move, index) => (
          <Typography
            key={index}
            sx={{ fontSize: "16px", textAlign: "center", color: "black" }}
          >
            {index % 2 === 0 ? `${Math.floor(index / 2) + 1}. ${move}` : move}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
