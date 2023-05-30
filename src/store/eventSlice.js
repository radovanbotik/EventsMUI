import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: null,
  status: "idle",
  filterOptions: {
    attendanceType: "active",
    date: new Date().getTime(),
    id: null,
  },
};

const slice = createSlice({
  name: "eventsActions",
  initialState,
  reducers: {
    loadEvents: (state, action) => {
      state.events = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setFilter: (state, action) => {
      state.filterOptions = action.payload;
    },
  },
});

export const { loadEvents, setFilter, setStatus } = slice.actions;
export default slice.reducer;
