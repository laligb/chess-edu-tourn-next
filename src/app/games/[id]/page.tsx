"use client";

import ChessGame from "@/components/ChessGame";
import { useEffect, useMemo } from "react";

import { useParams } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";

import MoveList from "@/components/MoveList";
import { useDispatch } from "react-redux";
import { GameDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  selectGame,
  selectLoading,
  selectMoves,
} from "@/redux/slices/games/gameSlice";
import { fetchGameThunkById } from "@/redux/slices/games/gameThunk";

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

  const chessBoard = useMemo(() => {
    if (!game?.pgn) return null;
    return <ChessGame pgn={game.pgn} />;
  }, [game?.pgn]);

  return (
    <Box sx={{ width: "50%", margin: "auto", mt: 4 }}>
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
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : game ? (
        <>
          <Typography variant="h6">
            {game.playerOne.name} vs {game.playerTwo.name} -
            {game.result || "Ongoing"}
          </Typography>
          {chessBoard}
          <MoveList moves={moves} />
        </>
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
