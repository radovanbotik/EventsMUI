import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    signIn: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    signOut: (state, action) => {
      (state.isAuthenticated = false), (state.currentUser = null);
    },
  },
});

export default authSlice.reducer;
export const { signIn, signOut } = authSlice.actions;
