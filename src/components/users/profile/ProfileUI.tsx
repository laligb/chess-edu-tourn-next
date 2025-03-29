"use client";

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
import { useEffect } from "react";

interface ProfileUIProps {
  user: {
    name?: string;
    email?: string;
    role: string;
  };
  onLogout: () => void;
}

const ProfileUI = ({ user, onLogout }: ProfileUIProps) => {
  useEffect(() => {
    console.log("current user", user);
  }, [user]);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={4}
    >
      <Card
        sx={{
          display: "flex",
          width: "80%",
          maxWidth: "900px",
          boxShadow: 4,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "35%",
            backgroundColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            color: "white",
          }}
        >
          <Avatar
            src={"/default-avatar.png"}
            sx={{ width: 150, height: 150, mb: 2, border: "4px solid white" }}
          />
          <Typography variant="h5" fontWeight="bold">
            {user.name || "John Doe"}
          </Typography>
          <Typography variant="subtitle1">
            {user.email || "johndoe@example.com"}
          </Typography>
          <Chip
            label={
              (user?.role || "user").charAt(0).toUpperCase() +
              (user?.role || "user").slice(1)
            }
            sx={{
              mt: 1,
              bgcolor: getRoleColor(user.role),
              color: "white",
              fontSize: "14px",
            }}
          />
        </Box>

        <CardContent sx={{ flex: 1, padding: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Profile Information
            </Typography>
            <Divider />

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

          <Divider sx={{ my: 3 }} />

          {/* Tournaments */}
          <Typography
            variant="h6"
            color="primary"
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

          {/* Friends */}
          <Typography
            variant="h6"
            color="primary"
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

          <Divider sx={{ my: 3 }} />

          {/* Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" startIcon={<EditIcon />}>
              Edit Profile
            </Button>
            <Button variant="contained" color="error" onClick={onLogout}>
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileUI;
