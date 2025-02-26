import Board from "@/components/Board";
import MoveList from "@/components/MoveList";
import { useEffect, useState } from "react";
import { fetchGameById } from "@/services/gameService";
import { fetchUserById } from "@/services/userService";
import { useParams } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Game } from "@/types";

export default function ChessGame() {
  const params = useParams() || {};
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [playerOneName, setPlayerOneName] = useState<string>("");
  const [playerTwoName, setPlayerTwoName] = useState<string>("");
  const [moves, setMoves] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    fetchGameById(id)
      .then(async (data: Game) => {
        setGame(data);

        const playerOne = await fetchUserById(data.playerOne._id);
        const playerTwo = await fetchUserById(data.playerTwo._id);

        setPlayerOneName(playerOne.name);
        setPlayerTwoName(playerTwo.name);

        const moveList = data.pgn
          .replace(/\[.*?\]/g, "")
          .replace(/\d+\./g, "")
          .trim()
          .split(/\s+/);

        setMoves(moveList);
      })
      .catch((error) => console.error("Error fetching game:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
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
    );
  }

  if (!game) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mt: 2, color: "gray" }}
      >
        Game not found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 4,
      }}
    >
      {/* Left: Chessboard */}
      <Box sx={{ flex: "1", minWidth: "300px", textAlign: "center" }}>
        <Typography variant="h6">
          {playerOneName} vs {playerTwoName} - {game.result || "Ongoing"}
        </Typography>
        <Board pgn={game.pgn} />
      </Box>

      {/* Right: Move List */}
      <MoveList moves={moves} />
    </Box>
  );
}
