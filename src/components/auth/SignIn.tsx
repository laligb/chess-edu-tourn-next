"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "@/redux/store";
import { loginUser } from "@/redux/slices/users/userSlice";
import SignInUI from "./SignInUI";

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    router.push("/profile");
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <SignInUI
      handleSubmit={handleSubmit}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      error={error}
    />
  );
}
