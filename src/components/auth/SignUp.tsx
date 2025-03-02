import { MUI } from "@/utils/multiImports";
import { Card, SignUpContainer, theme } from "@/styles/signupStyles";
import { useState } from "react";

export default function SignUp() {
  const [emailError] = useState(false);
  const [emailErrorMessage] = useState("");
  const [passwordError] = useState(false);
  const [passwordErrorMessage] = useState("");

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
              label="I agree to the terms and conditions"
            />
            <MUI.Button type="submit" fullWidth variant="contained">
              Sign up
            </MUI.Button>
          </MUI.Box>
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
