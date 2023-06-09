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

// const listener = createListenerMiddleware();
// listener.startListening({
//   actionCreator: agreededToProceed,
//   effect: async (action, listenerAPI) => {
//     console.log("clicked", action, listenerAPI);
//   },
// });

const store = configureStore({
  reducer: {
    eventReducer: eventReducer,
    modalReducer: modalReducer,
    authReducer: authReducer,
    profileReducer: profileReducer,
    confirmationReducer: confirmationReducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listener.middleware),
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log(user);
    // store.dispatch(setUser({ user: user.uid, authenticated: true }));

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
    // store.dispatch(setInitialized(true));
  }
});

export default store;
