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
} from "@mui/material";
import { red, yellow } from "@mui/material/colors";

import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";

interface Professor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface ProfessorsUIProps {
  professors: Professor[];
}

const ProfessorsUI = ({ professors }: ProfessorsUIProps) => {
  const [openChat, setOpenChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [likedProfessors, setLikedProfessors] = useState<{
    [key: string]: boolean;
  }>({});

  const handleOpenChat = (professorId: string) => {
    setOpenChat(professorId);
  };

  const handleCloseChat = () => {
    setOpenChat(null);
    setMessage(""); // Clear message field when closing
  };

  const handleRating = (id: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

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
              <Grid item xs={12} sm={6} md={4} key={professor.id}>
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
                      professor.avatar ||
                      "https://randomuser.me/api/portraits/men/75.jpg"
                    }
                    alt={professor.name}
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Avatar
                      src={
                        professor.avatar ||
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
                      {professor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {professor.email}
                    </Typography>

                    {/* Rating System */}
                    <Box display="flex" justifyContent="center" mt={1}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconButton
                          key={star}
                          onClick={() => handleRating(professor.id, star)}
                        >
                          {ratings[professor.id] >= star ? (
                            <FaStar style={{ color: yellow[700] }} />
                          ) : (
                            <FaRegStar style={{ color: yellow[700] }} />
                          )}
                        </IconButton>
                      ))}
                    </Box>

                    {/* Like Button */}
                    <Box display="flex" justifyContent="center" mt={1}>
                      <IconButton onClick={() => toggleLike(professor.id)}>
                        {likedProfessors[professor.id] ? (
                          <FaHeart style={{ color: red[500] }} />
                        ) : (
                          <FaRegHeart style={{ color: red[500] }} />
                        )}
                      </IconButton>
                    </Box>

                    {/* Chat Button */}
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ChatIcon />}
                      sx={{ mt: 2, borderRadius: 20 }}
                      onClick={() => handleOpenChat(professor.id)}
                    >
                      Chat
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center" sx={{ mt: 2 }}>
              No professors available
            </Typography>
          )}
        </Grid>
      </Paper>

      {/* Chat Dialog */}
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
          Chat with {professors.find((p) => p.id === openChat)?.name}
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
