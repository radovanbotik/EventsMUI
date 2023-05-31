import { useEffect } from "react";
import { db } from "../config/firebase";
import { Timestamp, collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useSubscribeToUsers = async ({ dependancies, action }) => {
  useEffect(() => {
    let q = query(collection(db, "users"), orderBy("displayName"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        const temp = doc.data();

        for (const key in temp) {
          if (temp[key] instanceof Timestamp) {
            temp[key] = temp[key].toDate().getTime();
          }
        }
        temp.id = doc.id;
        users.push(temp);
      });
      action(users);
      (error) => {
        console.log(error);
      };
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies || []);
};

export default useSubscribeToUsers;
