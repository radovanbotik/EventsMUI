import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../firestore/firestore";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";

const initialState = {
  user: null,
};

export const updateUser = createAsyncThunk("profileSlice/updateProfile", async (updates, thunkAPI) => {
  const loggedUser = getAuth().currentUser;
  const { user } = thunkAPI.getState().profileReducer;
  if (loggedUser.uid === user.id) {
    await updateProfile(auth.currentUser, updates);
    await updateDoc(doc(db, "users", loggedUser.uid), { ...updates, updated: serverTimestamp() });
  }
});

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUser.pending, (state, action) => {
      console.log("updating");
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log("updated");
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log("not updated error");
    });
  },
});

export default profileSlice.reducer;
export const { setUser } = profileSlice.actions;
