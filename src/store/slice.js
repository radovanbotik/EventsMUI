import { createSlice } from "@reduxjs/toolkit";
import { sampleData } from "../sampleData";
import { v4 as uuid } from "uuid";

const initialState = {
  events: sampleData,
};

const slice = createSlice({
  name: "eventsActions",
  initialState,
  reducers: {
    createEvent: {
      reducer: (state, action) => {
        state.events.unshift(action.payload);
      },
      prepare: event => {
        const id = uuid();
        return { payload: { id, ...event } };
      },
    },
    updateEvent: (state, action) => {
      //   return { ...state, events: [...state.events.filter(ev => ev.id !== action.payload.id), action.payload] };
      state.events = [...state.events.filter(ev => ev.id !== action.payload.id), action.payload];
    },
    deleteEvent: (state, action) => {
      //   return { ...state, events: [...state.events.filter(ev => ev.id !== action.payload.id)] };
      state.events = [...state.events.filter(ev => ev.id !== action.payload.id)];
    },
  },
});

export const { createEvent, updateEvent, deleteEvent } = slice.actions;
export default slice.reducer;
