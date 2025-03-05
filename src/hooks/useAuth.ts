import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppDispatch, type RootState } from "@/redux/store";
import { logoutUser } from "@/redux/slices/users/userSlice";

function useAuth() {
  const [isClient, setIsClient] = useState(false);
  const loading = useSelector((state: RootState) => state.user.loading);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router, isClient]);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return { isClient, loading, user, handleLogout };
}

export default useAuth;
