"use client";

import * as React from "react";
import { MUI } from "@/utils/multiImports";
import { Card, SignInContainer, theme } from "@/styles/loginStyles";

interface SignInUIProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  loading: boolean;
  error: string | null;
}

export default function SignInUI({
  handleSubmit,
  email,
  password,
  setEmail,
  setPassword,
  loading,
  error,
}: SignInUIProps) {
  return (
    <MUI.ThemeProvider theme={theme}>
      <MUI.CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <MUI.Typography
            component="h1"
            variant="h4"
            sx={{ textAlign: "center" }}
          >
            Sign in
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
              <MUI.FormLabel htmlFor="email">Email</MUI.FormLabel>
              <MUI.TextField
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MUI.FormControl>
            <MUI.FormControlLabel
              control={<MUI.Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <MUI.Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </MUI.Button>
          </MUI.Box>
          {error && (
            <MUI.Typography sx={{ color: "error.main", textAlign: "center" }}>
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
              Sign in with Google
            </MUI.Button>
            <MUI.Button
              fullWidth
              variant="outlined"
              startIcon={<MUI.FacebookIcon />}
            >
              Sign in with Facebook
            </MUI.Button>
            <MUI.Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <MUI.Link href="/signup" variant="body2">
                Sign up
              </MUI.Link>
            </MUI.Typography>
          </MUI.Box>
        </Card>
      </SignInContainer>
    </MUI.ThemeProvider>
  );
}
