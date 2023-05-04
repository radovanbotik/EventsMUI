import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    open: false,
    modalType: null,
    modalProps: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    closeModal: state => {
      console.log("closing");
      state.open = false;
      state.modalType = null;
      state.modalProps = null;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
