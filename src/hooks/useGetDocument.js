/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { db } from "../firestore/firestore";
import { getDoc, doc } from "firebase/firestore";

const useGetDocument = ({ id, collection, dependecies, data }) => {
  useEffect(() => {
    const getDocument = async () => {
      const document = await getDoc(doc(db, collection, id));
      if (document.exists()) {
        console.log(document.data());
        data(document.data());
      }
    };
    getDocument();
  }, dependecies);
};
export default useGetDocument;
