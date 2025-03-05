"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchTournaments,
  joinTournament,
  withdrawTournament,
} from "@/services/tournamentService";

import { Tournament } from "@/types";
import { RootState } from "@/redux/store";

export default function useTournFetches() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [userJoinedTournaments, setUserJoinedTournaments] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchTournaments()
      .then((data: Tournament[]) => {
        setTournaments(data);
        if (user) {
          const joinedTournaments = data
            .filter((tournament) => tournament.players.includes(user._id))
            .map((tournament) => tournament._id);
          setUserJoinedTournaments(joinedTournaments);
        }
      })
      .catch((error) => console.error("Error fetching tournaments:", error))
      .finally(() => setLoading(false));
  }, [user]);

  const fetchUpdatedTournaments = async () => {
    try {
      const data = await fetchTournaments();
      setTournaments(data);
    } catch (error) {
      console.error("Error fetching updated tournaments:", error);
    }
  };

  const handleJoinWithdraw = async (tournamentId: string) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const isJoined = userJoinedTournaments.includes(tournamentId);
    const userId = user._id;

    try {
      if (isJoined) {
        await withdrawTournament(tournamentId, userId);
        setUserJoinedTournaments((prevState) =>
          prevState.filter((id) => id !== tournamentId)
        );
      } else {
        await joinTournament(tournamentId, userId);
        setUserJoinedTournaments((prevState) => [...prevState, tournamentId]);
      }
      await fetchUpdatedTournaments();
    } catch (error) {
      console.error("Error in join/withdraw:", error);
    }
  };

  return { tournaments, userJoinedTournaments, handleJoinWithdraw, loading };
}
