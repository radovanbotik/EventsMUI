import { useEffect } from "react";
import { db } from "../config/firebase";
import { query, Timestamp, collection, onSnapshot, orderBy, where } from "firebase/firestore";

const useSubscribeToUserEvents = async ({ dependancies, action, userId, tab }) => {
  useEffect(() => {
    let q;
    const millis = Timestamp.fromDate(new Date());

    if (tab === "hosting") {
      q = query(
        collection(db, "events"),
        orderBy("date", "desc"),
        where("date", ">=", millis),
        where("hostId", "==", userId)
      );
    }
    if (tab === "attending") {
      q = query(
        collection(db, "events"),
        orderBy("date", "desc"),
        where("date", ">=", millis),
        where("attendeesId", "array-contains", userId)
      );
    }
    if (tab === "attended") {
      q = query(
        collection(db, "events"),
        orderBy("date", "desc"),
        where("date", "<=", millis),
        where("attendeesId", "array-contains", userId)
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events = [];
      snapshot.forEach((doc) => {
        const temp = doc.data();

        for (const key in temp) {
          if (temp[key] instanceof Timestamp) {
            temp[key] = temp[key].toDate().getTime();
          }
        }
        temp.id = doc.id;
        events.push(temp);
      });
      action(events);
      (error) => {
        console.log(error);
      };
    });
    return () => unsubscribe();
  }, dependancies || []);
};

export default useSubscribeToUserEvents;
