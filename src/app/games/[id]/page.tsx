"use client";

import ChessGame from "@/components/ChessGame";
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GameDispatch } from "@/redux/store";
import {
  selectGame,
  selectLoading,
  selectMoves,
} from "@/redux/slices/games/gameSlice";
import { fetchGameThunkById } from "@/redux/slices/games/gameThunk";
import ChessBoardWithMoves from "@/components/ChessBoardWIthMoves";

export default function GamePage() {
  const params = useParams() || {};
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const dispatch = useDispatch<GameDispatch>();
  const game = useSelector(selectGame);
  const loading = useSelector(selectLoading);
  const moves = useSelector(selectMoves);

  useEffect(() => {
    dispatch(fetchGameThunkById(id));
  }, [dispatch, id]);

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        Game Details
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : game ? (
        <ChessBoardWithMoves
          player1={game.playerOne.name}
          player2={game.playerTwo.name}
          result={game.result}
          moves={moves}
          chessBoard={<ChessGame pgn={game.pgn} />}
        />
      ) : (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 2, color: "gray" }}
        >
          Game not found.
        </Typography>
      )}
    </Box>
  );
}
