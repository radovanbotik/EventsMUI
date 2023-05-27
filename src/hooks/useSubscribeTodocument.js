import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onSnapshot, doc, Timestamp } from "firebase/firestore";
import { db } from "../firestore/firestore";
import { setStatus } from "../store/eventSlice";

const useSubscribeTodocument = ({ dbcollection, documentId, data, dependancies }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStatus("loading"));
    const unsubscribe = onSnapshot(
      doc(db, dbcollection, documentId),
      (document) => {
        if (!document.exists()) {
          dispatch(setStatus("error"));
          throw new Error("document doesnt exists");
        }
        const doc = document.data();
        for (const prop in doc) {
          if (doc[prop] instanceof Timestamp) {
            doc[prop] = doc[prop].toDate().getTime();
          }
        }
        doc.id = documentId;
        data(doc);
        dispatch(setStatus("idle"));
      },
      (error) => {
        setStatus("error");
      }
    );

    return () => unsubscribe();
  }, dependancies);
};

export default useSubscribeTodocument;
