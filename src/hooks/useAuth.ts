"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCurrentUser, logoutUser } from "@/redux/slices/users/userSlice";

function useAuth() {
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
    if (
      isClient &&
      !loading &&
      user &&
      window.location.pathname === "/signup"
    ) {
      router.push("/profile");
    } else if (
      isClient &&
      !loading &&
      !user &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup"
    ) {
      router.push("/login");
    }
  }, [user, loading, router, isClient]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return { user, loading, handleLogout };
}

export default useAuth;
