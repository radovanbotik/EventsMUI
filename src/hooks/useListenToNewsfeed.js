import { useEffect } from "react";
import { query, ref, orderByKey, limitToLast, onValue, off } from "firebase/database";
import { database } from "../config/firebase";

const useListenToNewsfeed = ({ userId, action, dependancies }) => {
  useEffect(() => {
    const users = query(ref(database, `posts/${userId}`), orderByKey(), limitToLast(10));
    const unsubsribe = onValue(
      users,
      (snapshot) => {
        if (!snapshot.exists()) {
          console.log("no feed to show");
          return;
        }
        const data = snapshot.val();
        const dataEntries = Object.entries(data);
        const posts = dataEntries.map((action) => ({
          postId: action[0],
          ...action[1],
        }));
        action(posts);
      },
      (error) => {
        console.log("hi");
        console.log(error);
      }
    );
    return () => unsubsribe();
  }, dependancies || []);
};

export default useListenToNewsfeed;
