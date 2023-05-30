import { useEffect } from "react";
import { onSnapshot, Timestamp, collection } from "firebase/firestore";
import { db } from "../config/firebase";
const useSubscribeToFollowers = ({ dependancies, action, userId }) => {
  useEffect(() => {
    const q = collection(db, "following", userId, "followers");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const followers = [];
      snapshot.forEach((doc) => {
        const temp = doc.data();

        for (const key in temp) {
          if (temp[key] instanceof Timestamp) {
            temp[key] = temp[key].toDate().getTime();
          }
        }
        followers.push(temp);
        console.log(followers);
      });
      action(followers);
      (error) => {
        console.log(error);
      };
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies || []);
};

export default useSubscribeToFollowers;
