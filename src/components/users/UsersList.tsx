"use client";

import { User } from "@/types";
import {
  Grid,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  InputAdornment,
  Pagination,
} from "@mui/material";

import UserCard from "@/components/cards/UserCard";
import useUsersFetches from "@/hooks/useUsersFetches";
import useChat from "@/hooks/useChat";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useSearch from "@/hooks/useSearch";
import { useState } from "react";
import UsersListUI from "./UsersListUI";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const usersPerPage = 6;
  const { users, loading, error } = useUsersFetches();
  const { message, openChat, handleOpenChat, handleCloseChat, setMessage } =
    useChat();
  const { searchQuery, handleSearchChange, handleClearSearch } = useSearch();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const usersToShow = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  const handlePaginationChange = (_: unknown, value: number) => {
    setPage(value);
  };
  return (
    <UsersListUI
      loading={loading}
      error={error}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      handleClearSearch={handleClearSearch}
      usersToShow={usersToShow}
      handleOpenChat={handleOpenChat}
      filteredUsers={filteredUsers}
      usersPerPage={usersPerPage}
      page={page}
      handlePaginationChange={handlePaginationChange}
      openChat={openChat}
      handleCloseChat={handleCloseChat}
      users={users}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default UsersList;
