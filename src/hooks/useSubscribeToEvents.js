import { Timestamp, collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStatus } from "../store/eventSlice";
import { db } from "../config/firebase";

const useSubscribeToEvents = ({ filterOptions, action, dependancies, userId }) => {
  const dispatch = useDispatch();
  let q;

  if (filterOptions) {
    const millis = Timestamp.fromMillis(filterOptions.date);
    if (filterOptions.attendanceType === "active") {
      q = query(collection(db, "events"), orderBy("date", "desc"), where("date", ">=", millis));
    }
    if (filterOptions.attendanceType === "hosting") {
      q = query(
        collection(db, "events"),
        orderBy("date", "desc"),
        where("date", ">=", millis),
        where("hostId", "==", userId)
      );
    }
    if (filterOptions.attendanceType === "attending") {
      q = query(
        collection(db, "events"),
        orderBy("date", "desc"),
        where("date", ">=", millis),
        where("attendeesId", "array-contains", userId)
      );
    }
    if (filterOptions.attendanceType === "attended") {
      q = query(
        collection(db, "events"),
        orderBy("date", "desc"),
        where("date", "<=", millis),
        where("attendeesId", "array-contains", userId)
      );
    }
    if (filterOptions.attendanceType === "expired") {
      q = query(collection(db, "events"), orderBy("date", "desc"), where("date", "<=", millis));
    }
  } else {
    q = query(collection(db, "events"), orderBy("date", "desc"));
  }

  useEffect(() => {
    dispatch(setStatus("loading"));
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
      dispatch(setStatus("idle")),
        (error) => {
          console.log(error);
        };
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies || []);
};

export default useSubscribeToEvents;
