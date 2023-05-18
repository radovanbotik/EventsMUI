import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { addDocumentToCollection, deleteDocument, updateDocument, createArrayUnion } from "../firestore/firestore";
import { toast } from "react-toastify";

//initial state
const initialState = {
  events: null,
  status: "idle",
};
//actions
export const setStatus = createAction("events/setStatus");

export const createEvent = createAsyncThunk("events/createEvent", async (event, thunkAPI) => {
  const { currentUser } = thunkAPI.getState().authReducer;
  const attendees = createArrayUnion([
    {
      id: currentUser.id,
      name: currentUser.displayName,
      photoURL: currentUser.photoURL || null,
    },
  ]);
  const attendeesId = createArrayUnion([currentUser.id]);
  const document = {
    ...event,
    hostedBy: currentUser.displayName,
    hostId: currentUser.id,
    hostPhotoURL: currentUser.photoURL || null,
    attendees: attendees,
    attendeesId: attendeesId,
  };
  try {
    await addDocumentToCollection({ collectionRef: "events", document: document });
  } catch (error) {
    console.log(error);
  }
});

export const updateEvent = createAsyncThunk("events/updateEv", async (event, thunkAPI) => {
  try {
    await updateDocument({ collectionRef: "events", document: event });
  } catch (error) {
    console.log(error);
  }
});

export const deleteEvent = createAsyncThunk("events/deleteEv", async (eventId, thunkAPI) => {
  try {
    await deleteDocument({ collectionRef: "events", docId: eventId });
  } catch (error) {
    console.log(error);
  }
});

export const cancelEv = createAsyncThunk("events/cancelEv", async (event, thunkAPI) => {
  try {
    await updateDocument({ collectionRef: "events", document: { ...event, cancelled: !event.cancelled } });
  } catch (error) {
    console.log(error);
  }
});

const slice = createSlice({
  name: "eventsActions",
  initialState,
  reducers: {
    loadEvents: (state, action) => {
      state.events = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setStatus, (state, action) => {
      state.status = action.payload;
    });
    //create event
    builder.addCase(createEvent.pending, (state, action) => {
      state.status = "loading";
      toast.info("Your post is being uploaded...");
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.status = "idle";
      toast.success("Your post has been succesfully uploaded!");
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.status = "idle";
      toast.error("There has been an error during upload!");
    });
    //update event
    builder.addCase(updateEvent.pending, (state, action) => {
      state.status = "loading";
      toast.info("Your post is being edited...");
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.status = "idle";
      toast.success("Your post has been succesfully edited!");
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.status = "idle";
      toast.loading("There has been an error during edit!");
    });
    //delete event
    builder.addCase(deleteEvent.pending, (state, action) => {
      state.status = "loading";
      toast.info("Your post is being deleted...");
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.status = "idle";
      toast.success("Your post has been succesfully deleted!");
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.status = "idle";
      toast.loading("There has been an error during deletion!");
    });
  },
});

export const { loadEvents } = slice.actions;
export default slice.reducer;
