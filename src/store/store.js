import { configureStore } from "@reduxjs/toolkit";
import eventReducer, { setStatus } from "./eventSlice";
import formReducer from "./formSlice";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";

import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./authSlice";
import { doc, onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../firestore/firestore";

const store = configureStore({
  reducer: {
    eventReducer: eventReducer,
    formReducer: formReducer,
    modalReducer: modalReducer,
    authReducer: authReducer,
    profileReducer: profileReducer,
  },
});

onAuthStateChanged(auth, user => {
  store.dispatch(setStatus("loading"));
  if (user) {
    //find user in user database and store that
    const unsub = onSnapshot(doc(db, "users", user.uid), doc => {
      store.dispatch(
        setUser({
          user: {
            email: doc.data().email,
            photoURL: doc.data().photoURL,
            displayName: doc.data().displayName,
            id: user.uid,
            // providerId: user.providerData[0].providerId,
          },
          authenticated: true,
        })
      );
      store.dispatch(setStatus("idle"));
    });
    // store.dispatch(
    //   setUser({
    //     user: {
    //       email: user.email,
    //       photoURL: user.photoURL,
    //       displayName: user.displayName,
    //       uid: user.uid,
    //       providerId: user.providerData[0].providerId,
    //     },
    //     authenticated: true,
    //   })
    // );
  } else {
    console.log("not authenticated");
    store.dispatch(setUser({ user: null, authenticated: false }));
  }
});

export default store;