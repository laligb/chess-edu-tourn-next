"use client";

import ChessGame from "@/components/ChessGame";
import { Box, Typography } from "@mui/material";

export default function GamePage() {
  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold", width: "100%" }}
      >
        Game Details
      </Typography>

      <ChessGame />
    </Box>
  );
}
