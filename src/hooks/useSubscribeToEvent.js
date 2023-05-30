import { useEffect } from "react";
import { onSnapshot, doc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const useSubscribeToEvent = ({ eventId, action, dependancies }) => {
  useEffect(() => {
    const q = doc(db, "events", eventId);
    const unsubscribe = onSnapshot(
      q,
      (document) => {
        if (!document.exists()) {
          throw new Error("Event doesn't exist.");
        }
        const doc = document.data();
        for (const prop in doc) {
          if (doc[prop] instanceof Timestamp) {
            doc[prop] = doc[prop].toDate().getTime();
          }
        }
        doc.id = document.id;
        action(doc);
      },
      (error) => {
        // setStatus("error");
        console.log(error);
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies);
};

export default useSubscribeToEvent;
