"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #1976D2, #42A5F5)",
        color: "white",
        p: 4,
      }}
    >
      <Container>
        <Typography variant="h2" fontWeight="bold">
          Welcome to Chess Academy 🎓
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Learn, Play, and Compete with the Best Professors
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mr: 2, borderRadius: 20 }}
            onClick={() => router.push("/professors")}
          >
            Find Professors
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 20 }}
            onClick={() => router.push("/tournaments")}
          >
            View Tournaments
          </Button>
        </Box>
      </Container>
      {children}
    </Box>
  );
};

export default HomeLayout;
