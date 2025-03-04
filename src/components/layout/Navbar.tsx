"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

const Sidebar = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  // Toggle Sidebar
  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Top Menu Actions
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Bar (AppBar) */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          {/* Sidebar Toggle Button */}
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

          {/* App Title */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            Chess Academy
          </Typography>

          {/* Profile, Settings, Logout */}
          <Button color="inherit" onClick={handleMenuClick}>
            <AccountCircleIcon sx={{ mr: 1 }} />
            Profile
          </Button>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => router.push("/settings")}>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <LogoutIcon sx={{ mr: 1, color: "red" }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        open={sidebarOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        {/* Sidebar Header */}
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Avatar src="/default-avatar.png" sx={{ mr: 2 }} />
          <Typography variant="h6">User Name</Typography>
        </Box>
        <Divider />

        {/* Navigation Items */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/professors")}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Professors" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/tournaments")}>
              <ListItemIcon>
                <EmojiEventsIcon />
              </ListItemIcon>
              <ListItemText primary="Tournaments" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/games")}>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary="Games" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
