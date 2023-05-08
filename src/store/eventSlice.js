import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { sampleData } from "../sampleData";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { getEventsRealTime } from "../firestore/firestore";

//initial state
const initialState = {
  events: null,
  status: "idle",
};

//actions
const setStatus = createAction("events/setStatus");

//extra reducers
export const loadEvents = createAsyncThunk("events/loadEvents", async (id, thunkAPI) => {
  thunkAPI.dispatch(setStatus("loading"));
  try {
    const response = await axios.get("http://127.0.0.1:5500/api/getEvents.json");
    if (response.statusText !== "OK") {
      throw new Error("error during fetching");
    }

    thunkAPI.dispatch(setStatus("resolved"));
    //action.meta
    return thunkAPI.fulfillWithValue(response.data, { msg: "success!!!!" });
  } catch (error) {
    thunkAPI.dispatch(setStatus("rejected"));
    //action.meta
    return thunkAPI.rejectWithValue(error.message, { msg: "fail!!!!" });
  }
});

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
    load: (state, action) => {
      state.events = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadEvents.pending, (state, action) => {
      // state.status = "loading";
    });
    builder.addCase(loadEvents.fulfilled, (state, action) => {
      // console.log(action);
      // state.status = "idle";
      state.events2 = action.payload;
    });
    builder.addCase(loadEvents.rejected, (state, action) => {
      // state.status = "idle";
      //rejectwithvalue value
    });
    builder.addCase(setStatus, (state, action) => {
      state.status = action.payload;
    });
  },
});

export const { createEvent, updateEvent, deleteEvent, load } = slice.actions;
export default slice.reducer;
// export const selectAllEvents = state => state.events;
// export const selectEventById = (state, id) => state.events.find(ev => ev.id === id);
