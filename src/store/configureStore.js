import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";
import formSlice from "./formSlice";

export default configureStore({
  reducer: {
    eventReducer: slice,
    formReducer: formSlice,
  },
});
