"use client";

import { MUI } from "@/utils/multiImports";
import { Card, SignUpContainer, theme } from "@/styles/signupStyles";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { auth } from "@/services/firebaseConfig";
import { apiClient } from "@/services/apiClient";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/slices/users/userSlice";

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Update Firebase profile with display name
      await updateProfile(user, { displayName: name });

      const token = await user.getIdToken();

      // ✅ Send user data to backend
      const response = await apiClient.post(
        "/users/signup",
        {
          _id: user.uid,
          email: user.email,
          name: name,
          role: "user",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ User stored in MongoDB:", response.data);

      dispatch(loginUser({ email, password }));

      router.push("/profile");
    } catch (error: any) {
      console.error("❌ Signup Failed:", error);
      setError(error.message || "Signup failed. Please try again.");
    }
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
