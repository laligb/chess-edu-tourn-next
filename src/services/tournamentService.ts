import { apiClient } from "./apiClient";

export const fetchTournaments = async () => {
  const response = await apiClient.get("/tournaments");
  return response.data;
};

export const fetchTournamentById = async (id: string) => {
  const response = await apiClient.get(`/tournaments/${id}`);
  return response.data;
};

// Join tournament
export const joinTournament = async (tournamentId: string, userId: string) => {
  const response = await apiClient.post(`/tournaments/${tournamentId}/join`, {
    userId,
  });
  return response.data;
};

// Withdraw from tournament
export const withdrawTournament = async (
  tournamentId: string,
  userId: string
) => {
  const response = await apiClient.delete(
    `/tournaments/${tournamentId}/withdraw`,
    {
      data: { userId },
    }
  );
  return response.data;
};
