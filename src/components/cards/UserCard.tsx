import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check"; // The icon after friend request is sent
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { purple } from "@mui/material/colors";
import { useState } from "react";

function UserCard({ user, handleOpenChat }) {
  const [liked, setLiked] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false); // Track the friend request status

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

  const handleInviteFriend = () => {
    setFriendRequestSent(true); // Mark the friend request as sent
    console.log(`Sending friendship request to ${user.name}`);
  };

  return (
    <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={
          user.photoUrl || "https://randomuser.me/api/portraits/men/75.jpg"
        }
        alt={user.name}
        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
      <CardContent sx={{ textAlign: "center", p: 3 }}>
        <Avatar
          src={
            user.photoUrl || "https://randomuser.me/api/portraits/men/75.jpg"
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
          <IconButton onClick={handleLikeToggle}>
            {liked ? (
              <FaHeart style={{ color: "red", fontSize: "24px" }} />
            ) : (
              <FaRegHeart style={{ color: "red", fontSize: "24px" }} />
            )}
          </IconButton>

          <IconButton
            onClick={handleInviteFriend}
            sx={{ ml: 2 }}
            disabled={friendRequestSent} // Disable the button once the request is sent
          >
            {friendRequestSent ? (
              <CheckIcon style={{ color: "#1976D2", fontSize: "24px" }} />
            ) : (
              <PersonAddIcon style={{ color: "#1976D2", fontSize: "24px" }} />
            )}
          </IconButton>

          <IconButton onClick={() => handleOpenChat(user._id)} sx={{ ml: 2 }}>
            <ChatIcon style={{ color: "#1976D2", fontSize: "24px" }} />
          </IconButton>
        </Box>

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: purple[500],
              "&:hover": {
                backgroundColor: purple[700],
              },
            }}
          >
            Play Chess Game
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserCard;
