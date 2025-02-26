"use client";

import { useEffect, useState } from "react";
import { fetchTournaments } from "@/services/tournamentService";

type Tournament = {
  id: string;
  title: string;
  players: string[];
  games: string[];
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    fetchTournaments()
      .then((data: Tournament[]) => setTournaments(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {tournaments.length > 0 ? (
          tournaments.map((t) => <li key={t.id}>{t.title}</li>)
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
}
