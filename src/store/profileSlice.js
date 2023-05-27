import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import {
  addDocumentToSubcollection,
  deleteDocumentFromSubCollection,
  deleteFileFromStorage,
  readSubcollection,
  removeDocumentFromSubcollection,
  updateDocument,
  updateUserProfile,
} from "../firestore/firestore";
import { toast } from "react-toastify";
import { increment } from "firebase/firestore";

const initialState = {
  user: null,
  eventTab: "hosting",
  following: [],
  followers: [],
  status: "idle",
};

export const updateUser = createAsyncThunk("profileSlice/updateProfile", async (updates, thunkAPI) => {
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
});

export const deleteImage = createAsyncThunk("profileSlice/deleteImage", async (imageName, thunkAPI) => {
  await deleteFileFromStorage(`${auth.currentUser.uid}/user_images/${imageName}`);
  await deleteDocumentFromSubCollection({
    collectionRef: "users",
    document1: auth.currentUser.uid,
    subcollectionRef: "photos",
    documentToDelete: imageName,
  });
  await updateUser({ photoURL: null });
});

export const followUser = createAsyncThunk("profileSlice/followUser", async (user, thunkAPI) => {
  const { currentUser } = thunkAPI.getState().authReducer;
  await addDocumentToSubcollection({
    parentCollection: "following",
    parentDocument: currentUser.id,
    subCollection: "following",
    document: user,
  });
  await addDocumentToSubcollection({
    parentCollection: "following",
    parentDocument: user.id,
    subCollection: "followers",
    document: currentUser,
  });
  await updateDocument({ collectionRef: "users", document: { id: user.id, followers: increment(1) } });
  await updateDocument({ collectionRef: "users", document: { id: currentUser.id, following: increment(1) } });
});

export const unfollowUser = createAsyncThunk("profileSlice/followerUser", async (user, thunkAPI) => {
  const { currentUser } = thunkAPI.getState().authReducer;
  await removeDocumentFromSubcollection({
    parentCollection: "following",
    parentDocument: currentUser.id,
    subCollection: "following",
    documentId: user.id,
  });
  await removeDocumentFromSubcollection({
    parentCollection: "following",
    parentDocument: user.id,
    subCollection: "followers",
    documentId: currentUser.id,
  });
  await updateDocument({ collectionRef: "users", document: { id: user.id, followers: increment(-1) } });
  await updateDocument({ collectionRef: "users", document: { id: currentUser.id, following: increment(-1) } });
});

export const getFollowers = createAsyncThunk("profileSlice/getFollowers", async (userId, thunkAPI) => {
  return await readSubcollection({ parentCollection: "following", parentDocument: userId, subCollection: "followers" });
});
export const getFollowing = createAsyncThunk("profileSlice/getFollowing", async (userId, thunkAPI) => {
  return await readSubcollection({ parentCollection: "following", parentDocument: userId, subCollection: "following" });
});

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
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
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
    builder.addCase(getFollowers.pending, (state, action) => {
      console.log("loading");
    });
    builder.addCase(getFollowers.fulfilled, (state, action) => {
      state.followers = action.payload;
    });
    builder.addCase(getFollowers.rejected, (state, action) => {
      console.log("error");
    });
    builder.addCase(getFollowing.pending, (state, action) => {
      console.log("loading");
    });
    builder.addCase(getFollowing.fulfilled, (state, action) => {
      state.following = action.payload;
    });
    builder.addCase(getFollowing.rejected, (state, action) => {
      console.log("error");
    });
  },
});

export default profileSlice.reducer;
export const { setViewedUser, setEventTab, setStatus, setFollowers, setFollowing } = profileSlice.actions;
