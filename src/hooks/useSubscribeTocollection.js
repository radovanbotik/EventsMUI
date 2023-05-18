import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStatus } from "../store/eventSlice";
import { createQuery, subscribeToCollection } from "../firestore/firestore";
// import { onSnapshot, collection, Timestamp, query } from "firebase/firestore";
// import { db } from "../firestore/firestore";

const useSubscribeTocollection = ({ filter, collectionRef, action, dependancies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatus("loading"));
    console.log(filter);
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
    let query;
    switch (filter.attendanceType) {
      case "attending":
        query = createQuery({
          collectionRef: collectionRef,
          field: "attendeesId",
          operator: "array-contains",
          value: filter.id,
        });
        break;
      case "hosting":
        query = createQuery({
          collectionRef: collectionRef,
          field: "hostId",
          operator: "==",
          value: filter.id,
        });
        break;
      default:
        query = createQuery({
          collectionRef: collectionRef,
        });
        break;
    }

    const unsubscribe = subscribeToCollection({ collectionRef, q: query, action });
    dispatch(setStatus("idle"));

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies || []);
};

export default useSubscribeTocollection;
