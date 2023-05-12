import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStatus } from "../store/eventSlice";
import { onSnapshot, collection, Timestamp, query } from "firebase/firestore";
import { db } from "../firestore/firestore";

const useSubscribeTocollection = ({ q, dbcollection = "events", data, dependancies }) => {
  const dispatch = useDispatch();
  const collectionRef = collection(db, dbcollection);

  useEffect(() => {
    dispatch(setStatus("loading"));
    const unsubscribe = onSnapshot(
      query(collectionRef, q && q),
      snapshot => {
        const events = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          for (const prop in data) {
            if (data[prop] instanceof Timestamp) {
              data[prop] = data[prop].toDate().toISOString();
            }
          }
          events.push({ ...data, id: doc.id });
        });
        data(events);
        dispatch(setStatus("idle"));
      },
      error => {
        dispatch(setStatus("idle"));
      }
    );
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies && dependancies);
};

export default useSubscribeTocollection;
