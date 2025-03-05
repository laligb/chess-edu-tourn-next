import {
  fetchUsers,
  fetchUserById,
  firebaseLogin,
} from "@/services/userService";
import { User } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface UserState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

const getStoredUser = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const initialState: UserState = {
  users: [],
  user: getStoredUser(),
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk("user/fetchUsers", fetchUsers);
export const getUserById = createAsyncThunk(
  "user/fetchUserById",
  fetchUserById
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await firebaseLogin(email, password);
      console.log("Login API Response:", response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Login failed");
    }
  }
);

export const checkUserSession = createAsyncThunk<User | null>(
  "user/checkSession",
  async () => {
    return new Promise((resolve) => {
      const auth = getAuth();
      console.log("🔍 Checking Firebase session...");
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("✅ Firebase session found:", user);
          resolve({
            _id: user.uid,
            name: user.displayName || "No Name",
            email: user.email || "",
            role: "user",
            photoUrl: user.photoURL || "",
            tournaments: [],
            friends: [],
            followers: [],
            following: [],
            games: [],
            groups: [],
          });
        } else {
          console.log("❌ No Firebase session found");
          resolve(null);
        }
        unsubscribe();
      });
    });
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch users";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.user) {
          const userData = {
            _id: action.payload.user._id,
            name: action.payload.user.name,
            email: action.payload.user.email,
            role: action.payload.user.role,
          };
          state.user = userData;
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          state.error = "Invalid user data received";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export type { UserState };
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
