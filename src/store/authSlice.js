import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  status: "idle",
};

//actions
const setStatus = createAction("auth/setStatus");

//extra reducers
export const logIn = createAsyncThunk("authSlice/logIn", async (credentials, thunkAPI) => {
  const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  const user = { email: result.user.email };
  return user;
});

export const logOut = createAsyncThunk("authSlice/logOut", async (_, thunkAPI) => {
  const result = await signOut(auth);
  return result;
});

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
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logIn.pending, (state, action) => {
      state.isAuthenticated = false;
      state.status = "loading";
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.currentUser = { email: action.payload.email };
      state.isAuthenticated = true;
      state.status = "idle";
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.status = "idle";
    });
    builder.addCase(logOut.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.status = "idle";
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.status = "idle";
    });
  },
});

export default authSlice.reducer;
export const { signIn } = authSlice.actions;
