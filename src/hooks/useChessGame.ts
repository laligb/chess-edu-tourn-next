import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFen,
  selectLegalMoves,
  updateMove,
  getLegalMoves,
} from "@/redux/slices/games/gameSlice";
import { Square } from "chess.js";

export default function useChessGame() {
  const dispatch = useDispatch();
  const fen = useSelector(selectFen);
  const legalMoves = useSelector(selectLegalMoves);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [, setAvailableMoves] = useState<string[]>([]);
  const targetSquareRef = useRef<string | null>(null);

  useEffect(() => {
    if (selectedSquare && legalMoves[selectedSquare]) {
      console.log(
        "Legal moves updated for",
        selectedSquare,
        ":",
        legalMoves[selectedSquare]
      );
      setAvailableMoves([...legalMoves[selectedSquare]]);

      if (
        targetSquareRef.current &&
        legalMoves[selectedSquare].includes(targetSquareRef.current)
      ) {
        console.log(
          `Retrying move: ${selectedSquare} → ${targetSquareRef.current}`
        );
        dispatch(
          updateMove({ from: selectedSquare, to: targetSquareRef.current })
        );
        targetSquareRef.current = null;
      }
    }
  }, [legalMoves, selectedSquare, dispatch]);

  const onDrop = (sourceSquare: string, targetSquare: string): boolean => {
    console.log("Attempting move:", sourceSquare, "to", targetSquare);

    if (!legalMoves[sourceSquare]) {
      console.log(`Fetching moves for ${sourceSquare}...`);
      setSelectedSquare(sourceSquare);
      targetSquareRef.current = targetSquare;
      dispatch(getLegalMoves({ square: sourceSquare as Square }));
      return false;
    }

    if (!legalMoves[sourceSquare].includes(targetSquare)) {
      console.warn("Illegal move attempted:", sourceSquare, "to", targetSquare);
      return false;
    }

    dispatch(updateMove({ from: sourceSquare, to: targetSquare }));
    return true;
  };

  const onSquareClick = (square: string) => {
    setSelectedSquare(square);
    dispatch(getLegalMoves({ square: square as Square }));
  };

  return { fen, onDrop, onSquareClick };
}
