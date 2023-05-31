import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { joinEvent } from "../firestore/eventActions";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  eventTab: "hosting",
  following: [],
  followers: [],
  status: "idle",
};

// export const join = createAsyncThunk("joinEvent", joinEvent);

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
  // extraReducers: (builder) => {
  //   builder.addCase(join.pending, (state, action) => console.log("success, joined"));
  //   builder.addCase(join.fulfilled, (state, action) => toast.success("You have joined an event."));
  //   builder.addCase(join.rejected, (state, action) => console.log("success, joined"));
  // },
});

export default profileSlice.reducer;
export const { setViewedUser, setEventTab, setStatus, setFollowers, setFollowing } = profileSlice.actions;
