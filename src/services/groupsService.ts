import { apiClient } from "./apiClient";

export const fetchGroups = async () => {
  const response = await apiClient.get("/groups");
  return response.data;
};

export const fetchGroupById = async (id: string) => {
  const response = await apiClient(`/groups/${id}`);
  return response.data;
};
