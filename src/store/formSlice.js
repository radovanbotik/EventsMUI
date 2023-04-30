import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isEditing: false,
  eventId: "",
};

const formSlice = createSlice({
  name: "formActions",
  initialState,
  reducers: {
    setFormOpen: state => {
      state.isOpen = true;
    },
    setFormClosed: state => {
      state.isOpen = false;
    },
    setEditingTrue: state => {
      state.isEditing = true;
    },
    setEditingFalse: state => {
      state.isEditing = false;
    },
    setEventId: (state, action) => {
      state.eventId = action.payload.id;
    },
  },
});

export const { setFormOpen, setFormClosed, setEditingTrue, setEditingFalse, setEventId } = formSlice.actions;
export default formSlice.reducer;
