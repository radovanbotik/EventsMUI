import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firestore/firestore";

const useSubscribeUser = ({ action, dependancies, userId }) => {
  let q = doc(db, "users", userId);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const user = snapshot.data();
        for (const key in user) {
          if (user[key] instanceof Timestamp) {
            user[key] = user[key].toDate();
          }
        }
        action(user);
      },
      (error) => console.log(error)
    );
    return () => unsubscribe();
  }, dependancies || []);
};

export default useSubscribeUser;
