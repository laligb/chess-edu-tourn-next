"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppDispatch, type RootState } from "@/redux/store";
import { logoutUser } from "@/redux/slices/users/userSlice";
import ProfileUI from "./ProfileUI";

const Profile = () => {
  const [isClient, setIsClient] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !loading && !user) {
      console.log("🔄 Redirecting to /login...");
      router.push("/login");
    }
  }, [user, loading, router, isClient]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  if (!isClient || loading) return <p>Loading session...</p>;

  if (!user) return null;

  return <ProfileUI user={user} onLogout={handleLogout} />;
};

export default Profile;
