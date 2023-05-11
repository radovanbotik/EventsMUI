import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";
import formReducer from "./formSlice";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";

import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../store/authSlice";

const store = configureStore({
  reducer: {
    eventReducer: eventReducer,
    formReducer: formReducer,
    modalReducer: modalReducer,
    authReducer: authReducer,
  },
});

onAuthStateChanged(auth, user => {
  if (user) {
    console.log(user);
    store.dispatch(
      setUser({
        user: {
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          uid: user.uid,
          providerId: user.providerData[0].providerId,
        },
        authenticated: true,
      })
    );
  } else {
    console.log("not authenticated");
    store.dispatch(setUser({ user: null, authenticated: false }));
  }
});

export default store;
