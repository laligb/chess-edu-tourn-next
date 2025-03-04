import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SchoolIcon from "@mui/icons-material/School";
import { getRoleColor } from "@/styles/roleColors";

interface ProfileUIProps {
  user: {
    name?: string;
    email?: string;
    role: string;
  };
  onLogout: () => void;
}

const ProfileUI = ({ user, onLogout }: ProfileUIProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ maxWidth: 600, width: "100%", padding: 3, boxShadow: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={"/default-avatar.png"}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold">
            {user.name || "John Doe"}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {user.email || "johndoe@example.com"}
          </Typography>
          <Chip
            label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            sx={{
              mt: 1,
              bgcolor: getRoleColor(user.role),
              color: "white",
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <CardContent>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" fontWeight="bold">
                Name:
              </Typography>
              <Typography variant="body1">{user.name || "john_doe"}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" fontWeight="bold">
                Joined:
              </Typography>
              <Typography variant="body1">January 2024</Typography>
            </Box>

            {user.role === "student" && (
              <Box display="flex" alignItems="center" gap={1}>
                <SchoolIcon color="primary" />
                <Typography variant="body1">
                  Assigned Professor: <strong>Not Assigned Yet</strong>
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>

        <>
          <Typography
            variant="h6"
            sx={{ mt: 2, mb: 1 }}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <SportsEsportsIcon /> Registered Tournaments
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="No tournaments registered yet" />
            </ListItem>
          </List>
          <Divider sx={{ my: 2 }} />
        </>

        <>
          <Typography
            variant="h6"
            sx={{ mt: 2, mb: 1 }}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <GroupIcon /> Friends
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="No friends added yet" />
            </ListItem>
          </List>
        </>

        <Button
          variant="contained"
          startIcon={<EditIcon />}
          fullWidth
          sx={{ mt: 2 }}
        >
          Edit Profile
        </Button>

        <Button variant="contained" color="error" fullWidth onClick={onLogout}>
          Logout
        </Button>
      </Card>
    </Box>
  );
};

export default ProfileUI;
