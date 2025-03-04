"use client";

import { Box } from "@mui/material";
import { Chessboard } from "react-chessboard";
import useChessGame from "@/hooks/useChessGame";

const ChessGame = () => {
  const { fen, onDrop, onSquareClick } = useChessGame();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "500px",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        boardWidth={500}
      />
    </Box>
  );
};

export default ChessGame;
