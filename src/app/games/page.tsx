"use client";

import { selectGames, selectLoading } from "@/redux/slices/games/gameSlice";
import { AppDispatch } from "@/redux/store";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGamesThunk } from "@/redux/slices/games/gameThunk";
import ChessView from "@/components/ChessView";

export default function GamesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector(selectGames);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchGamesThunk());
  }, [dispatch]);

  return (
    <Box sx={{ px: 4, py: 6 }}>
      {/* Title Section */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#1976D2",
          mb: 4,
        }}
      >
        Chess Battle Arena
      </Typography>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : games.length > 0 ? (
        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid item key={game._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                {/* Game Preview */}
                <CardMedia>
                  <ChessView pgn={game.pgn} />
                </CardMedia>

                <CardContent>
                  {/* Game Title */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
                  >
                    {game.playerOne?.name} vs {game.playerTwo?.name}
                  </Typography>

                  {/* Game Details */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    textAlign="center"
                  >
                    Classic Chess Match
                  </Typography>

                  {/* View Game Button */}
                  <Box textAlign="center" mt={2}>
                    <Link href={game._id ? `/games/${game._id}` : "#"} passHref>
                      <Button variant="contained" color="primary">
                        View Match
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No games found. Try again later!
        </Typography>
      )}
    </Box>
  );
}
