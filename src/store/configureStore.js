import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";
import formReducer from "./formSlice";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    eventReducer: eventReducer,
    formReducer: formReducer,
    modalReducer: modalReducer,
    authReducer: authReducer,
  },
});
