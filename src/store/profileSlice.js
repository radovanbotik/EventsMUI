import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import {
  deleteDocumentFromSubCollection,
  deleteFileFromStorage,
  updateDocument,
  updateUserProfile,
} from "../firestore/firestore";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  eventTab: "hosting",
};

export const updateUser = createAsyncThunk(
  "profileSlice/updateProfile",
  async (updates, thunkAPI) => {
    const loggedUser = auth.currentUser;
    const { user } = thunkAPI.getState().profileReducer;
    console.log(updates);
    if (loggedUser.uid === user.id) {
      await updateUserProfile(updates);
      await updateDocument({
        collectionRef: "users",
        document: { ...updates, id: loggedUser.uid },
      });
    }
  }
);

export const deleteImage = createAsyncThunk(
  "profileSlice/deleteImage",
  async (imageName, thunkAPI) => {
    await deleteFileFromStorage(
      `${auth.currentUser.uid}/user_images/${imageName}`
    );
    await deleteDocumentFromSubCollection({
      collectionRef: "users",
      document1: auth.currentUser.uid,
      subcollectionRef: "photos",
      documentToDelete: imageName,
    });
    await updateUser({ photoURL: null });
  }
);

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: initialState,
  reducers: {
    setViewedUser: (state, action) => {
      state.user = action.payload;
    },
    setEventTab: (state, action) => {
      state.eventTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state, action) => {
      console.log("updating");
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log("updated");
      toast.success("your profile has been updated!");
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log("not updated error");
      toast.success("There has been an error during update");
    });
  },
});

export default profileSlice.reducer;
export const { setViewedUser, setEventTab } = profileSlice.actions;
