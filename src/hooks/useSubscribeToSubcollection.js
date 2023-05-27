import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { subscribeToSubcollection } from "../firestore/firestore";
import { setStatus } from "../store/profileSlice";

const useSubscribeToSubcollection = ({ parentCollection, parentDocument, subCollection, dependancies, action }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStatus("loading"));
    const unsubscribe = subscribeToSubcollection({ parentCollection, parentDocument, subCollection, action });
    dispatch(setStatus("idle"));
    return () => unsubscribe();
  }, dependancies || []);
};

export default useSubscribeToSubcollection;
