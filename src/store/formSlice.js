import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: false,
};

const formSlice = createSlice({
  name: "formActions",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
});

export const { setEditing } = formSlice.actions;
export default formSlice.reducer;
