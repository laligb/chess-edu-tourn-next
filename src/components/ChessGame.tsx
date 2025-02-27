"use client";

import { Box } from "@mui/material";
import { Chessboard } from "react-chessboard";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFen,
  selectLegalMoves,
  updateMove,
  getLegalMoves,
} from "@/redux/slices/games/gameSlice";
import { Square } from "chess.js";
import { useEffect, useState } from "react";

const ChessGame = () => {
  const dispatch = useDispatch();
  const fen = useSelector(selectFen);
  const legalMoves = useSelector(selectLegalMoves);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [availableMoves, setAvailableMoves] = useState<string[]>([]);

  // ✅ Fetch legal moves when clicking a piece
  const onPieceClick = (square: string) => {
    setSelectedSquare(square);
    dispatch(getLegalMoves({ square: square as Square }));
  };

  // ✅ Wait for Redux to update before allowing a move
  useEffect(() => {
    if (selectedSquare) {
      console.log(
        "Legal moves for",
        selectedSquare,
        ":",
        legalMoves[selectedSquare] || []
      );
      setAvailableMoves(legalMoves[selectedSquare] || []);
    }
  }, [legalMoves, selectedSquare]);

  // ✅ Validate legal move before making it
  const onDrop = (sourceSquare: string, targetSquare: string): boolean => {
    console.log("Attempting move:", sourceSquare, "to", targetSquare);
    console.log("Available moves for", sourceSquare, ":", availableMoves);

    if (!availableMoves.includes(targetSquare)) {
      console.warn("Illegal move attempted:", sourceSquare, "to", targetSquare);
      return false; // ❌ Prevent illegal moves
    }

    dispatch(updateMove({ from: sourceSquare, to: targetSquare })); // ✅ Update Redux state
    return true;
  };

  return (
    <Box>
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        onSquareClick={onPieceClick} // ✅ Fetch legal moves on click
      />
    </Box>
  );
};

export default ChessGame;
