import { useEffect } from "react";
import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const useIsFollowingThisUser = ({ userId, action, dependancies }) => {
  useEffect(() => {
    const q = doc(db, "following", userId, "followers", auth.currentUser.uid);
    const unsubscribe = onSnapshot(
      q,
      (document) => {
        if (!document.exists()) {
          return action(false);
        }
        return action(true);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies);
};

export default useIsFollowingThisUser;
