import { apiClient } from "./apiClient";

export const fetchTournaments = async () => {
  const response = await apiClient.get("/tournaments");
  return response.data;
};

export const fetchTournamentById = async (id: string) => {
  const response = await apiClient.get(`/tournaments/${id}`);
  return response.data;
};
