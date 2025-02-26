"use client";

import ChessGame from "@/components/ChessGame";
import { fetchGames } from "@/services/gameService";
import { Game } from "@/types";
import { Box, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames()
      .then((data: Game[]) => setGames(data))
      .catch((error) => console.error("Error fetching tournaments:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {games.map((game) => {
              console.log("Game object:", game);

              return (
                <Box
                  key={game._id}
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: 2,
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    maxWidth: "100%",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {game.playerOne?.name} - {game.playerTwo?.name}
                  </Typography>
                  <Link href={game._id ? `/games/${game._id}` : "#"} passHref>
                    <ChessGame pgn={game.pgn} />
                  </Link>
                </Box>
              );
            })}
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
    </>
  );
}
