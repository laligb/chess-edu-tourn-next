import * as React from "react";
import { MUI } from "@/utils/multiImports";
import { Card, SignInContainer, theme } from "@/styles/loginStyles";

export default function SignIn() {
  const [emailError] = React.useState(false);
  const [emailErrorMessage] = React.useState("");
  const [passwordError] = React.useState(false);
  const [passwordErrorMessage] = React.useState("");

  const handleSubmit = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </MUI.FormControl>
            <MUI.FormControl>
              <MUI.FormLabel htmlFor="password">Password</MUI.FormLabel>
              <MUI.TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </MUI.FormControl>
            <MUI.FormControlLabel
              control={<MUI.Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <MUI.Button type="submit" fullWidth variant="contained">
              Sign in
            </MUI.Button>
          </MUI.Box>
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
