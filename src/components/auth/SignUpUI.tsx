"use client";

import * as React from "react";
import { MUI } from "@/utils/multiImports";
import { Card, SignUpContainer, theme } from "@/styles/signupStyles";

interface SignUpUIProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  error: string | null;
}

export default function SignUpUI({
  handleSubmit,
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  error,
}: SignUpUIProps) {
  return (
    <MUI.ThemeProvider theme={theme}>
      <MUI.CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <MUI.Typography
            component="h1"
            variant="h4"
            sx={{ textAlign: "center" }}
          >
            Sign up
          </MUI.Typography>
          <MUI.Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <MUI.FormControl>
              <MUI.FormLabel htmlFor="name">Name</MUI.FormLabel>
              <MUI.TextField
                id="name"
                name="name"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </MUI.FormControl>
            <MUI.FormControl>
              <MUI.FormLabel htmlFor="email">Email</MUI.FormLabel>
              <MUI.TextField
                id="email"
                name="email"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MUI.FormControl>
            <MUI.FormControl>
              <MUI.FormLabel htmlFor="password">Password</MUI.FormLabel>
              <MUI.TextField
                name="password"
                type="password"
                id="password"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MUI.FormControl>
            <MUI.Button type="submit" fullWidth variant="contained">
              Sign up
            </MUI.Button>
          </MUI.Box>
          {error && (
            <MUI.Typography
              sx={{ color: "error.main", textAlign: "center", mt: 2 }}
            >
              {error}
            </MUI.Typography>
          )}
          <MUI.Divider>or</MUI.Divider>
          <MUI.Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <MUI.Button
              fullWidth
              variant="outlined"
              startIcon={<MUI.GoogleIcon />}
            >
              Sign up with Google
            </MUI.Button>
            <MUI.Button
              fullWidth
              variant="outlined"
              startIcon={<MUI.FacebookIcon />}
            >
              Sign up with Facebook
            </MUI.Button>
            <MUI.Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <MUI.Link href="/login" variant="body2">
                Sign in
              </MUI.Link>
            </MUI.Typography>
          </MUI.Box>
        </Card>
      </SignUpContainer>
    </MUI.ThemeProvider>
  );
}
