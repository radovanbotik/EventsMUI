import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firestore/firestore";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  status: "idle",
};
//actions

//extra reducers
export const registerUser = createAsyncThunk("authSlice/registerUser", async (credentials, thunkAPI) => {
  const result = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
  await setDoc(doc(db, "users", result.user.uid), {
    displayName: result.user.displayName || result.user.email,
    email: result.user.email,
    photoURL: result.user.photoURL || null,
    phoneNumber: result.user.phoneNumber || null,
    createdAt: result.user.metadata.createdAt,
    creationTime: result.user.metadata.creationTime,
  });
});

export const logIn = createAsyncThunk("authSlice/logIn", async (credentials, thunkAPI) => {
  const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  const user = { email: result.user.email };
  return user;
});

export const logOut = createAsyncThunk("authSlice/logOut", async (_, thunkAPI) => {
  const result = await signOut(auth);
  return result;
});

export const updateUser = createAsyncThunk("authslice/updateUser", async (updates, thunkAPI) => {
  const result = await updateProfile(auth.currentUser, updates);
  return result;
});
//sign in google
export const signInWithGoogle = createAsyncThunk("authSlice/signInWithGoogle", async (arg, thunkAPI) => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const isNewUser = getAdditionalUserInfo(result).isNewUser;
  if (isNewUser) {
    await setDoc(doc(db, "users", result.user.uid), {
      displayName: result.user.displayName || result.user.email,
      email: result.user.email,
      photoURL: result.user.photoURL || null,
      phoneNumber: result.user.phoneNumber || null,
      createdAt: result.user.metadata.createdAt,
      creationTime: result.user.metadata.creationTime,
    });
    console.log("added");
    return;
  }
  console.log(user);
  return;
});
//change password
export const changePassword = createAsyncThunk("authSlice/changePassword", async (password, thunkAPI) => {
  const user = auth.currentUser;
  await updatePassword(user, password);
});
export const retrieveUser = createAsyncThunk("authSlice/retrieveUser", async (id, thunkAPI) => {
  const user = await getDoc(doc(db, "users", id));
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
