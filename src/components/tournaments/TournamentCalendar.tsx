import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Paper, Typography } from "@mui/material";
import { Tournament } from "@/types";

type TournamentCalendarProps = {
  tournaments: Tournament[];
};

export default function TournamentCalendar({
  tournaments,
}: TournamentCalendarProps) {
  const events = tournaments.map((tournament) => ({
    title: tournament.title,
    start: tournament.date,
  }));

  return (
    <Paper sx={{ p: 2, boxShadow: 4, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Tournament Calendar
      </Typography>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </Paper>
  );
}
