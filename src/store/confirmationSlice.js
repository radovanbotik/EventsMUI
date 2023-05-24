import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  title: null,
  content: null,
};

const confirmationSlice = createSlice({
  name: "confirmationActions",
  initialState,
  reducers: {
    askForPermission: (state, action) => {
      state = action.payload;
    },
    resetConfirmation: (state, action) => (state = initialState),
  },
  // extraReducers:(builder=>{
  //     builder.addCase()
  // })
});

export default confirmationSlice.reducer;
export const { askForPermission, resetConfirmation } = confirmationSlice.actions;
