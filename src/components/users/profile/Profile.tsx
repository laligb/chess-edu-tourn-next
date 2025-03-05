"use client";

import useAuth from "@/hooks/useAuth";
import ProfileUI from "./ProfileUI";

const Profile = () => {
  const { user, handleLogout } = useAuth();
  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  return <ProfileUI user={user} onLogout={handleLogout} />;
};

export default Profile;
