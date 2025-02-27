"use client";

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
    <div>
      <Chessboard position={game.fen()} />
    </div>
  );
}

export default ChessGame;
