"use client";

import { Box } from "@mui/material";
import { Chessboard } from "react-chessboard";
import useChessGame from "@/hooks/useChessGame";

const ChessGame = () => {
  const { fen, onDrop, onSquareClick } = useChessGame();

  return (
    <Box>
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
      />
    </Box>
  );
};

export default ChessGame;
