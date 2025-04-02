"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCurrentUser, logoutUser } from "@/redux/slices/users/userSlice";

type UseAuthOptions = {
  requireAuth?: boolean;
};

function useAuth({ requireAuth = false }: UseAuthOptions = {}) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      dispatch(fetchCurrentUser());
    }
  }, [isClient, dispatch]);

  useEffect(() => {
    if (!isClient || loading) return;

    // 🚫 If user is already logged in and visits /signup, redirect to /profile
    if (user && window.location.pathname === "/signup") {
      router.push("/profile");
    }

    // 🚫 If this is a protected page (requireAuth = true) and user is not logged in, redirect to /login
    if (requireAuth && !user) {
      router.push("/login");
    }

    // ✅ Otherwise, no redirection happens (good for public pages)
  }, [user, loading, router, isClient, requireAuth]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return { user, loading, handleLogout };
}

export default useAuth;
