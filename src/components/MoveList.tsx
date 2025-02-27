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
        flex: "0.8",
        minWidth: "250px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: 2,
        backgroundColor: "#f9f9f9",
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
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
            sx={{ fontSize: "16px", textAlign: "center" }}
          >
            {index % 2 === 0 ? `${Math.floor(index / 2) + 1}. ${move}` : move}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
