import { listenToLocation } from "../firestore/realtimeDatabase";
import { useEffect } from "react";

const useListenToEventComments = ({ eventId, action, dependencies }) => {
  useEffect(() => {
    listenToLocation({
      location: `/events/${eventId}/comments`,
      action: action,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies || []);
};

export default useListenToEventComments;
