import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  eventTab: "hosting",
  following: [],
  followers: [],
  status: "idle",
};

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
});

export default profileSlice.reducer;
export const { setViewedUser, setEventTab, setStatus, setFollowers, setFollowing } = profileSlice.actions;
