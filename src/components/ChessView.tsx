"use client";

import { Box } from "@mui/material";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

interface ChessGameProps {
  pgn: string;
}

export default function ChessView({ pgn }: ChessGameProps) {
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    if (pgn) {
      console.log("PGN Loaded:", pgn);
      const chess = new Chess();
      chess.loadPgn(pgn);
      setGame(chess);
      console.log("FEN CURRENT:", game.fen);
    }
  }, [pgn]);

  return (
    <Box>
      <Chessboard position={game.fen()} />
    </Box>
  );
}
