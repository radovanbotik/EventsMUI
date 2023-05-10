import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, signOut, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firestore/firestore";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  status: "idle",
};
//actions
// export const setUser = createAction('auth/setUser')

//extra reducers
export const registerUser = createAsyncThunk("authSlice/registerUser", async (credentials, thunkAPI) => {
  const result = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
  if (!result) throw new Error("user hasnt been registered");
  await setDoc(doc(db, "users", result.user.uid), {
    displayName: result.user.displayName || null,
    email: result.user.email,
    photoURL: result.user.photoURL || null,
    phoneNumber: result.user.phoneNumber || null,
    createdAt: result.user.metadata.createdAt,
    creationTime: result.user.metadata.creationTime,
  });
});

export const logIn = createAsyncThunk("authSlice/logIn", async (credentials, thunkAPI) => {
  const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  console.log(result.user);
  const user = { email: result.user.email };
  return user;
});

export const logOut = createAsyncThunk("authSlice/logOut", async (_, thunkAPI) => {
  const result = await signOut(auth);
  return result;
});

export const updateUser = createAsyncThunk("authslice/UpdateUser", async (updates, thunkAPI) => {
  const result = await updateProfile(auth.currentUser, updates);
  return result;
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
    //update user
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log("success");
    });
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;
