import { apiClient } from "./apiClient";

export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};
