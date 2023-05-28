import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { setStatus } from "../store/eventSlice";
import {
  convertMillisToTimestamp,
  createCompoundQuery,
  createQuery,
  subscribeToCollection,
} from "../firestore/firestore";
// import { onSnapshot, collection, Timestamp, query } from "firebase/firestore";
// import { db } from "../firestore/firestore";

const useSubscribeTocollection = ({ filter, collectionRef, action, dependancies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("loading");
    // dispatch(setStatus("loading"));
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
    //     value: convertMillisToTimestamp(filter.date),
    //   }
    // ]})

    let query;

    if (filter) {
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
                value: convertMillisToTimestamp(new Date().getTime()),
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
                value: convertMillisToTimestamp(new Date().getTime()),
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
                value: convertMillisToTimestamp(new Date().getTime()),
              },
            ],
          });
          break;
        case "attended":
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
                operator: "<=",
                value: convertMillisToTimestamp(new Date().getTime()),
              },
            ],
          });
          break;
        default:
          query = createCompoundQuery({
            collectionRef: collectionRef,
            constraints: [
              {
                field: "date",
                operator: ">=",
                value: convertMillisToTimestamp(filter.date),
              },
            ],
          });
          break;
      }
    } else {
      query = createQuery({ collectionRef: collectionRef });
    }

    const unsubscribe = subscribeToCollection({
      collectionRef,
      q: query,
      action,
    });
    // dispatch(setStatus("idle"));

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies || []);
};

export default useSubscribeTocollection;
