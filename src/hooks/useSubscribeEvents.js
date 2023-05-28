import { Timestamp, collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firestore/firestore";
import { setStatus } from "../store/eventSlice";

const useSubscribeEvents = ({ filterOptions, action, dependancies }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.authReducer.currentUser);
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
        where("hostId", "==", id)
      );
    }
    if (filterOptions.attendanceType === "attending") {
      q = query(
        collection(db, "events"),
        orderBy("date", "desc"),
        where("date", ">=", millis),
        where("attendeesId", "array-contains", id)
      );
    }
    if (filterOptions.attendanceType === "attended") {
      q = query(
        collection(db, "events"),
        orderBy("date", "desc"),
        where("date", "<=", millis),
        where("attendeesId", "array-contains", id)
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
  }, dependancies || []);
};

export default useSubscribeEvents;
