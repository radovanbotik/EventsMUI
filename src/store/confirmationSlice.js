import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  open: false,
  title: null,
  content: null,
  confirmButtonText: null,
  rejectButtonText: null,
  actionType: null,
  cancelled: null,
};

export const agreededToProceed = createAction("agreededToProceed");

const confirmationSlice = createSlice({
  name: "confirmationActions",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      const { id, open, actionType, title, content, confirmButtonText, rejectButtonText, cancelled } = action.payload;
      Object.assign(state, { id, open, actionType, title, content, confirmButtonText, rejectButtonText, cancelled });
    },
    reset: (state, action) => Object.assign(state, { ...initialState }),
  },
});

export default confirmationSlice.reducer;
export const { reset, setOpen } = confirmationSlice.actions;
