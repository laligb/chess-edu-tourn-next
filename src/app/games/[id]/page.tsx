"use client";

import ChessGame from "@/components/ChessGame";
import { useEffect, useState } from "react";
import { fetchGameById } from "@/services/gameService";
import { fetchUserById } from "@/services/userService";
import { useParams } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Game } from "@/types";

export default function GamePage() {
  const params = useParams() || {};
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [playerOneName, setPlayerOneName] = useState<string>("");
  const [playerTwoName, setPlayerTwoName] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    fetchGameById(id)
      .then(async (data: Game) => {
        setGame(data);

        const playerOne = await fetchUserById(data.playerOne._id);
        const playerTwo = await fetchUserById(data.playerTwo._id);

        setPlayerOneName(playerOne.name);
        setPlayerTwoName(playerTwo.name);

        console.log(playerOne.name);
        console.log(playerTwo.name);
      })
      .catch((error) => console.error("Error fetching game:", error))
      .finally(() => setLoading(false));
  }, [id]);

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
            {playerOneName} vs {playerTwoName} - {game.result || "Ongoing"}
          </Typography>
          <ChessGame pgn={game.pgn} />
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
