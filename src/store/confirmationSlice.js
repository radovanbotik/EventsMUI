import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const confirmationSlice = createSlice({
  name: "confirmationActions",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = true;
    },
    reset: (state, action) => Object.assign(state, { ...initialState }),
  },
});

export default confirmationSlice.reducer;
export const { reset, setOpen } = confirmationSlice.actions;
