import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ChatIcon from "@mui/icons-material/Chat";

function UserCard({ user, handleOpenChat }) {
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
          <Button variant="contained" size="small" sx={{ marginRight: 1 }}>
            Follow
          </Button>
          <Button variant="contained" size="small" sx={{ marginRight: 1 }}>
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
  );
}

export default UserCard;
