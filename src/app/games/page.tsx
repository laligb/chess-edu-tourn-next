"use client";

import ChessGame from "@/components/ChessGame";
import {
  fetchGamesThunk,
  selectGames,
  selectLoading,
} from "@/redux/slices/gameSlice";
import { AppDispatch } from "@/redux/store";
import { Box, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GamesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector(selectGames);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (games.length === 0) {
      // ✅ Prevent infinite fetch calls
      dispatch(fetchGamesThunk());
    }
  }, [dispatch, games.length]); // ✅ Only runs when `games.length` changes

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
      >
        Games
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
      ) : games.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 2,
          }}
        >
          {games.map((game) => (
            <Box
              key={game._id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: 2,
              }}
            >
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
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 2, color: "gray" }}
        >
          No games found.
        </Typography>
      )}
    </Box>
  );
}
