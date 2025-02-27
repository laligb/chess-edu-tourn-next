import { SxProps, Theme } from "@mui/material";

// ✅ Page Container
export const gamesPageContainer: SxProps<Theme> = {
  width: "80%",
  margin: "auto",
  mt: 4,
};

// ✅ Title Style
export const gamesTitle: SxProps<Theme> = {
  mb: 3,
  textAlign: "center",
  fontWeight: "bold",
};

// ✅ Loading Indicator Style
export const loadingContainer: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "300px",
};

// ✅ Games Grid Layout
export const gamesGrid: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: 1,
};

// ✅ Game Card Style
export const gameCard: SxProps<Theme> = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  boxShadow: 2,
};

// ✅ No Games Found Text
export const noGamesText: SxProps<Theme> = {
  textAlign: "center",
  mt: 2,
  color: "gray",
};
