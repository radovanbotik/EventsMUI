import { configureStore, createListenerMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";
import modalReducer from "./modalSlice";
import authReducer, { setInitialized } from "./authSlice";
import profileReducer from "./profileSlice";
import confirmationReducer from "./confirmationSlice";

import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./authSlice";
import { doc, onSnapshot, collection, query } from "firebase/firestore";

const store = configureStore({
  reducer: {
    eventReducer: eventReducer,
    modalReducer: modalReducer,
    authReducer: authReducer,
    profileReducer: profileReducer,
    confirmationReducer: confirmationReducer,
  },
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log(user);
    onSnapshot(doc(db, "users", user.uid), (doc) => {
      store.dispatch(
        setUser({
          user: {
            email: doc.data().email,
            photoURL: doc.data().photoURL,
            displayName: doc.data().displayName,
            id: user.uid,
          },
          authenticated: true,
        })
      );
      store.dispatch(setInitialized(true));
    });
  } else {
    console.log("not authenticated");
    store.dispatch(setUser({ user: null, authenticated: false }));
  }
});

export default store;
