import { useEffect } from "react";
import { subscribeToSubcollectionAndFindDocument } from "../firestore/firestore";

// subscribeToSubcollectionAndFindDocument({
//   parentCollection: "following",
//   parentDocument: "Z4TJIaHLwTMJpt5uoAwGZiWzdur1",
//   subCollection: "followers",
//   id: "TWqAPKpOT0ZqNcbtpzujRWqO1ij2",
// });

const useIsFollowingThisUser = ({ parentCollection, parentDocument, subCollection, action, dependancies }) => {
  useEffect(() => {
    const unsubscribe = subscribeToSubcollectionAndFindDocument({
      parentCollection,
      parentDocument,
      subCollection,
      action,
    });
    // return () => unsubscribe();
  }, dependancies || []);
};

export default useIsFollowingThisUser;
