import {
  Grid2,
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
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

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

  const handleOpenChat = (professorId: string) => {
    setOpenChat(professorId);
  };

  const handleCloseChat = () => {
    setOpenChat(null);
    setMessage(""); // Clear message field when closing
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

        <Grid2
          container
          spacing={4}
          columns={{ xs: 4, sm: 8, md: 12 }}
          component="div"
          justifyContent="center"
        >
          {professors.length > 0 ? (
            professors.map((professor) => (
              <Grid2 xs={4} sm={4} md={3} key={professor.id} component="div">
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
                    sx={{
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
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
              </Grid2>
            ))
          ) : (
            <Typography align="center" sx={{ mt: 2 }}>
              No professors available
            </Typography>
          )}
        </Grid2>
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
