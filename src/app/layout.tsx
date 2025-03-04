import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { Box, Container } from "@mui/material";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chess Academy",
  description: "Learn, Play, and Compete with the Best Professors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className}`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Navbar />
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Container sx={{ flex: 1, mt: 4, px: 0 }}>{children}</Container>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
