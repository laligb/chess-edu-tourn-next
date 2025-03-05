import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGroups } from "@/services/groupsService";

interface Group {
  _id: string;
  name: string;
  professor: string;
  students: string[];
}

interface GroupState {
  groups: Group[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

export const getGroups = createAsyncThunk("group/fetchGroups", async () => {
  const response = await fetchGroups();
  return response;
});

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch groups";
      });
  },
});

export default groupSlice.reducer;
