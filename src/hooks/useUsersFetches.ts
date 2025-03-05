import { getUsers, UserState } from "@/redux/slices/users/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
function useUsersFetches() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user as UserState
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return { users, loading, error };
}

export default useUsersFetches;
