"use client";

import ChessGame from "@/components/ChessGame";
import { selectGames, selectLoading } from "@/redux/slices/games/gameSlice";
import { GameDispatch } from "@/redux/store";
import { Box, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gamesPageContainer,
  gamesTitle,
  loadingContainer,
  gamesGrid,
  gameCard,
  noGamesText,
} from "@/styles/gamesStyles";
import { fetchGamesThunk } from "@/redux/slices/games/gameThunk";

export default function GamesPage() {
  const dispatch = useDispatch<GameDispatch>();
  const games = useSelector(selectGames);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchGamesThunk());
  }, [dispatch]);

  return (
    <Box sx={gamesPageContainer}>
      <Typography variant="h4" sx={gamesTitle}>
        Games
      </Typography>

      {loading ? (
        <Box sx={loadingContainer}>
          <CircularProgress />
        </Box>
      ) : games.length > 0 ? (
        <Box sx={gamesGrid}>
          {games.map((game) => (
            <Box key={game._id} sx={gameCard}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {game.playerOne?.name} - {game.playerTwo?.name}
              </Typography>
              <Link href={game._id ? `/games/${game._id}` : "#"} passHref>
                <ChessGame pgn={game.pgn} />
              </Link>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="h6" sx={noGamesText}>
          No games found.
        </Typography>
      )}
    </Box>
  );
}
