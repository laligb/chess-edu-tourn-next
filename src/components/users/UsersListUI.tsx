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

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const UsersListUI = ({
  loading,
  error,
  searchQuery,
  handleSearchChange,
  handleClearSearch,
  usersToShow,
  handleOpenChat,
  filteredUsers,
  usersPerPage,
  page,
  handlePaginationChange,
  openChat,
  handleCloseChat,
  users,
  message,
  setMessage,
}) => {
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
              <UserCard user={user} handleOpenChat={handleOpenChat} />
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
          Chat with{" "}
          {users.find((user: { _id: string }) => user._id === openChat)?.name}
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

export default UsersListUI;
