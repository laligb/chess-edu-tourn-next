"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { getUsers, UserState } from "@/redux/slices/users/userSlice";
import { User } from "@/types";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  CardMedia,
  Box,
  Paper,
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
import ChatIcon from "@mui/icons-material/Chat";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user as UserState
  );

  const [openChat, setOpenChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleOpenChat = (userId: string) => {
    setOpenChat(userId);
  };

  const handleCloseChat = () => {
    setOpenChat(null);
    setMessage("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const usersToShow = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  const handlePaginationChange = (_: any, value: number) => {
    setPage(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h2" color="primary" gutterBottom>
        Chess Players
      </Typography>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <Box display="flex" justifyContent="center" mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search Users..."
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "white",
            borderRadius: 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {usersToShow.length > 0 ? (
          usersToShow.map((user: User) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    user.photoUrl ||
                    "https://randomuser.me/api/portraits/men/75.jpg"
                  }
                  alt={user.name}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Avatar
                    src={
                      user.photoUrl ||
                      "https://randomuser.me/api/portraits/men/75.jpg"
                    }
                    sx={{
                      width: 90,
                      height: 90,
                      mx: "auto",
                      mb: 2,
                      border: "4px solid white",
                      boxShadow: 3,
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>

                  <Box display="flex" justifyContent="center" mt={1}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Follow
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Send Friendship
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ChatIcon />}
                      onClick={() => handleOpenChat(user._id)}
                    >
                      Chat
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography align="center" sx={{ mt: 2 }}>
            No users found.
          </Typography>
        )}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filteredUsers.length / usersPerPage)}
          page={page}
          onChange={handlePaginationChange}
        />
      </Box>

      <Dialog
        open={!!openChat}
        onClose={handleCloseChat}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Chat with {users.find((user) => user._id === openChat)?.name}
          <IconButton
            onClick={handleCloseChat}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <ClearIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Type your message..."
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChat} color="error">
            Cancel
          </Button>
          <Button variant="contained" disabled={!message.trim()}>
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersPage;
