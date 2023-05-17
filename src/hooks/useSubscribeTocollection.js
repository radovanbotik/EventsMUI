import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStatus } from "../store/eventSlice";
import { subscribeToCollection } from "../firestore/firestore";
// import { onSnapshot, collection, Timestamp, query } from "firebase/firestore";
// import { db } from "../firestore/firestore";

const useSubscribeTocollection = ({ q, collectionRef, action, dependancies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatus("loading"));
    // const unsubscribe = onSnapshot(
    //   query(collection(db, collectionRef), q),
    //   snapshot => {
    //     const events = [];
    //     snapshot.forEach(doc => {
    //       const data = doc.data();
    //       for (const prop in data) {
    //         if (data[prop] instanceof Timestamp) {
    //           data[prop] = data[prop].toDate().toISOString();
    //         }
    //       }
    //       events.push({ ...data, id: doc.id });
    //     });
    //     action(events);
    //     dispatch(setStatus("idle"));
    //   },
    //   error => {
    //     dispatch(setStatus("idle"));
    //   }
    // );
    const unsubscribe = subscribeToCollection({ collectionRef, q, action });
    dispatch(setStatus("idle"));

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies || []);
};

export default useSubscribeTocollection;
