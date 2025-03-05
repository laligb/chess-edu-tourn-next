import { Bar } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";
import { Tournament } from "@/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TournamentStatisticsProps = {
  tournaments: Tournament[];
};

export default function TournamentStatistics({
  tournaments,
}: TournamentStatisticsProps) {
  const tournamentNames = tournaments.map((t) => t.title);
  const playerCounts = tournaments.map((t) => t.players.length);

  const data = {
    labels: tournamentNames,
    datasets: [
      {
        label: "Players",
        data: playerCounts,
        backgroundColor: "#1976D2",
        borderColor: "#1565C0",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper sx={{ p: 3, boxShadow: 4, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Most Popular Tournaments
      </Typography>
      <Bar data={data} />
    </Paper>
  );
}
