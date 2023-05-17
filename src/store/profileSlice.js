import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import { updateDocument, updateUserProfile } from "../firestore/firestore";

const initialState = {
  user: null,
};

export const updateUser = createAsyncThunk("profileSlice/updateProfile", async (updates, thunkAPI) => {
  const loggedUser = auth.currentUser;
  const { user } = thunkAPI.getState().profileReducer;
  if (loggedUser.uid === user.id) {
    await updateUserProfile(updates);
    await updateDocument({ collectionRef: "users", document: { ...updates, id: loggedUser.uid } });
  }
});

const profileSlice = createSlice({
  name: "profileSlice",
  initialState: initialState,
  reducers: {
    setViewedUser: (state, action) => {
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
export const { setViewedUser } = profileSlice.actions;
