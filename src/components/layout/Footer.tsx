"use client";

import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        backgroundColor: "#1976D2",
        color: "white",
        mt: 4,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Chess HUB. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
