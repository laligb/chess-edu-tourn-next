"use client";

import { Box } from "@mui/material";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

interface ChessGameProps {
  pgn: string;
  fen: string;
}

export default function ChessView({ pgn, fen }: ChessGameProps) {
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    if (pgn) {
      const chess = new Chess();
      chess.loadPgn(pgn);
      setGame(chess);
    }
  }, [pgn]);

  useEffect(() => {
    if (fen) {
      setGame(new Chess(fen));
    }
  }, [fen]);

  return (
    <Box>
      <Chessboard position={game.fen()} />
    </Box>
  );
}
