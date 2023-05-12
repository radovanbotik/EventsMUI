import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const getUser = createAsyncThunk("profileSlice/getUser", async (id, thunkAPI) => {});

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {},
});

export default profileSlice.reducer;
export const { setUser } = profileSlice.actions;
