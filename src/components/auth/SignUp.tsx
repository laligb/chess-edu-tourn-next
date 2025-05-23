"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { auth } from "@/services/firebaseConfig";
import { apiClient } from "@/services/apiClient";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { AppDispatch } from "@/redux/store";
import SignUpUI from "./SignUpUI";
import { loginUser } from "@/redux/slices/users/userSlice";

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

      await updateProfile(user, { displayName: name });

      await user.reload();
      const updatedUser = auth.currentUser;
      const token = await updatedUser!.getIdToken();

      const response = await apiClient.post(
        "/users/signup",
        {
          _id: updatedUser!.uid,
          email: updatedUser!.email,
          name: name,
          role: "user",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ User stored in MongoDB:", response.data);

      const loginResponse = await dispatch(
        loginUser({ email, password })
      ).unwrap();

      if (loginResponse) {
        console.log(
          "✅ User successfully logged in after signup:",
          loginResponse
        );
        router.push("/profile");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <SignUpUI
      handleSubmit={handleSubmit}
      name={name}
      email={email}
      password={password}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
    />
  );
}
