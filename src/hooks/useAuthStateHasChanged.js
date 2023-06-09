import { useEffect } from "react";
import { db } from "../config/firebase";
import { useDispatch } from "react-redux";
import { onSnapshot, doc } from "firebase/firestore";
import { setUser } from "../store/authSlice";
import { setInitialized } from "../store/authSlice";

const useAuthStateHasChanged = ({ userId, dependancies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", userId), (doc) => {
      dispatch(
        setUser({
          user: {
            email: doc.data().email,
            photoURL: doc.data().photoURL,
            displayName: doc.data().displayName,
            id: userId,
          },
          authenticated: true,
        })
      );
      dispatch(setInitialized(true));
    });
    return () => unsubscribe();
  }, dependancies || []);
};

export default useAuthStateHasChanged;
