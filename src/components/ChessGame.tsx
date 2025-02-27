"use client";

import { Box } from "@mui/material";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

type ChessBoardProps = {
  pgn: string;
};

function ChessGame({ pgn }: ChessBoardProps) {
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    if (pgn) {
      const chess = new Chess();
      chess.loadPgn(pgn);
      setGame(chess);
    }
  }, [pgn]);

  return (
    <Box>
      <Chessboard position={game.fen()} />
    </Box>
  );
}

export default ChessGame;
