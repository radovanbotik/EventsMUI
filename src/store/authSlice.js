import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createUserWithMail,
  getDocumentOnce,
  signInUser,
  signOutUser,
  signWithGoogle,
  updateUserPassword,
  updateUserProfile,
} from "../firestore/firestore";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  status: "idle",
};
//actions

//extra reducers
export const registerUser = createAsyncThunk("authSlice/registerUser", async (userdata, thunkAPI) => {
  await createUserWithMail(userdata);
});

export const logIn = createAsyncThunk("authSlice/logIn", async (userdata, thunkAPI) => {
  signInUser(userdata);
});

export const logOut = createAsyncThunk("authSlice/logOut", async (_, thunkAPI) => {
  signOutUser();
});

export const updateUser = createAsyncThunk("authslice/updateUser", async (updates, thunkAPI) => {
  updateUserProfile;
});
//sign in google
export const signInWithGoogle = createAsyncThunk("authSlice/signInWithGoogle", async (arg, thunkAPI) => {
  await signWithGoogle();
});
//change password
export const changePassword = createAsyncThunk("authSlice/changePassword", async (password, thunkAPI) => {
  updateUserPassword(password);
});
export const retrieveUser = createAsyncThunk("authSlice/retrieveUser", async (id, thunkAPI) => {
  await getDocumentOnce({ collectionRef: "users", documentId: id });
});

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
  },
  extraReducers: builder => {
    //login user
    builder.addCase(logIn.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.status = "idle";
      toast.success("you have logged in!");
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.status = "idle";
      toast.error("there was an unexpected error!");
    });
    //logout user
    builder.addCase(logOut.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.status = "idle";
      toast.success("you have been logged out!");
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.status = "idle";
      toast.error("there was an unexpected error!");
    });
    //register user
    builder.addCase(registerUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "idle";
      toast.success("you have registered!");
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "idle";
      toast.error("there was an unexpected error!");
    });
    //sign with google
    builder.addCase(signInWithGoogle.pending, (state, action) => {
      state.status = "loading";
      toast.info("gears are spinning!");
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.status = "idle";
      toast.success("you are in!");
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.status = "idle";
      toast.error("there was an unexpected error!");
    });
    //update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      toast.success("your profile has been changed!");
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      toast.error("there was an unexpected error!");
    });
    //password change
    builder.addCase(changePassword.fulfilled, (state, action) => {
      toast.success("your password has been changed!");
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      toast.error("there was an unexpected error!");
    });
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
