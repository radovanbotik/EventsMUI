import { useEffect } from "react";
import { db } from "../config/firebase";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";

const useSubscribeToUser = ({ action, dependancies, userId }) => {
  let q = doc(db, "users", userId);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const user = snapshot.data();
        for (const key in user) {
          if (user[key] instanceof Timestamp) {
            user[key] = user[key].toDate().getTime();
          }
        }
        user.id = snapshot.id;
        action(user);
      },
      (error) => console.log(error)
    );
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies || []);
};

export default useSubscribeToUser;
