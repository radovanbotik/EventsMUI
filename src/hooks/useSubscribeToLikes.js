/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { onSnapshot, collection, query, where, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const useSubscribeToLikes = ({ event, user, action, dependancies }) => {
  useEffect(() => {
    const q = query(doc(db, "likes", event.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot);
      const likesTotal = [];
      snapshot.forEach((doc) => {
        console.log(doc.data());
        likesTotal.push(doc.data().displayName);
      });

      action(likesTotal);
    });

    return () => unsubscribe();
  }, dependancies || []);
};

export default useSubscribeToLikes;
