import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStatus } from "../store/eventSlice";
import {
  convertDateToTimestamp,
  createCompoundQuery,
  createQuery,
  subscribeToCollection,
} from "../firestore/firestore";
// import { onSnapshot, collection, Timestamp, query } from "firebase/firestore";
// import { db } from "../firestore/firestore";

const useSubscribeTocollection = ({ filter, collectionRef, action, dependancies }) => {
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
    // createCompoundQuery({collectionRef:collectionRef,constraints:[
    //   {
    //     field: "attendeesId",
    //     operator: "array-contains",
    //     value: filter.id,
    //   },
    //   {
    //     field: "date",
    //     operator: ">=",
    //     value: convertDateToTimestamp(filter.date),
    //   }
    // ]})

    let query;

    if (filter) {
      console.log(filter);
      switch (filter.attendanceType) {
        case "attending":
          query = createCompoundQuery({
            collectionRef: collectionRef,
            constraints: [
              {
                field: "attendeesId",
                operator: "array-contains",
                value: filter.id,
              },
              {
                field: "date",
                operator: ">=",
                value: convertDateToTimestamp(filter.date),
              },
            ],
          });
          break;
        case "hosting":
          // query = createQuery({
          //   collectionRef: collectionRef,
          //   field: "hostId",
          //   operator: "==",
          //   value: filter.id,
          // });
          query = createCompoundQuery({
            collectionRef: collectionRef,
            constraints: [
              {
                field: "hostId",
                operator: "==",
                value: filter.id,
              },
              {
                field: "date",
                operator: ">=",
                value: convertDateToTimestamp(filter.date),
              },
            ],
          });
          break;
        case "all":
          query = createCompoundQuery({
            collectionRef: collectionRef,
            constraints: [
              {
                field: "date",
                operator: ">=",
                value: convertDateToTimestamp(filter.date),
              },
            ],
          });
          break;
        case "attended":
          query = createCompoundQuery({
            collectionRef: collectionRef,
            constraints: [
              {
                field: "date",
                operator: "<=",
                value: convertDateToTimestamp(filter.date),
              },
            ],
          });
          break;
        default:
          query = createCompoundQuery({
            collectionRef: collectionRef,
            constraints: [
              {
                field: "attendeesId",
                operator: "array-contains",
                value: filter.id,
              },
              {
                field: "date",
                operator: ">=",
                value: convertDateToTimestamp(filter.date),
              },
            ],
          });
          break;
      }
    } else {
      query = createQuery({ collectionRef: collectionRef });
    }

    const unsubscribe = subscribeToCollection({ collectionRef, q: query, action });
    dispatch(setStatus("idle"));

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies || []);
};

export default useSubscribeTocollection;
