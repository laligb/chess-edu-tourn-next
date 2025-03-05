import {
  Grid,
  Card,
  CardContent,
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
} from "@mui/material";
import { red } from "@mui/material/colors";

import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Group, User } from "@/types";

export interface ProfessorsUIProps {
  professors: User[];
  searchQuery: string;
  handleClearSearch: () => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenChat: (userId: string) => void;
  openChat: string | null;
  handleCloseChat: () => void;
  setMessage: (message: string) => void;
  message: string;
  getStudentCount: (professorId: string) => number;
  groups: Group[];
}

const ProfessorsUI = ({
  professors,
  searchQuery,
  handleSearchChange,
  handleClearSearch,
  handleOpenChat,
  openChat,
  handleCloseChat,
  setMessage,
  message,
  getStudentCount,
  groups,
}: ProfessorsUIProps) => {
  const [likedProfessors, setLikedProfessors] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleLike = (id: string) => {
    setLikedProfessors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        sx={{
          maxWidth: 1200,
          width: "100%",
          padding: 4,
          boxShadow: 4,
          borderRadius: 3,
        }}
      >
        <Box display="flex" justifyContent="center" mb={3}>
          <TextField
            variant="outlined"
            placeholder="Search Professors..."
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

        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 4, fontWeight: "bold", color: "#1976d2" }}
        >
          Meet Our Professors
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {professors.length > 0 ? (
            professors.map((professor) => (
              <Grid item xs={12} sm={6} md={4} key={professor._id}>
                <Card
                  sx={{
                    boxShadow: 5,
                    borderRadius: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      professor.photoUrl ||
                      "https://randomuser.me/api/portraits/men/75.jpg"
                    }
                    alt={professor.name}
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {professor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {professor.email}
                    </Typography>

                    <Box display="flex" justifyContent="center" mt={1}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                      >
                        Students:
                        {groups && groups.length > 0
                          ? getStudentCount(professor._id)
                          : 0}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="center" mt={1}>
                      <IconButton onClick={() => toggleLike(professor._id)}>
                        {likedProfessors[professor._id] ? (
                          <FaHeart style={{ color: red[500] }} />
                        ) : (
                          <FaRegHeart style={{ color: red[500] }} />
                        )}
                      </IconButton>
                    </Box>

                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ChatIcon />}
                      sx={{ mt: 2, borderRadius: 20 }}
                      onClick={() => handleOpenChat(professor._id)}
                    >
                      Chat
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center" sx={{ mt: 2 }}>
              No professors found.
            </Typography>
          )}
        </Grid>
      </Paper>

      <Dialog
        open={!!openChat}
        onClose={handleCloseChat}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Chat with {professors.find((p) => p._id === openChat)?.name}
          <IconButton onClick={handleCloseChat}>
            <CloseIcon />
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
    </Box>
  );
};

export default ProfessorsUI;
