import { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const useSubscribeToImages = ({ userId, action, dependancies }) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users", userId, "photos"),
      (snapshot) => {
        const photos = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          photos.push(data);
        });
        action(photos);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies || []);
};

export default useSubscribeToImages;
