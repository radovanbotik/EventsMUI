import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  status: "idle",
  isInitialized: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setUser: (state, action) => {
      state.isAuthenticated = action.payload.authenticated;
      state.currentUser = action.payload.user;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
export const { setUser, setInitialized, setStatus } = authSlice.actions;
