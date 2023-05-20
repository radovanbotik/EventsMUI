import { listenToLocation } from "../firestore/realtimeDatabase";
import { useEffect } from "react";

const useListenToEventComments = ({ eventId, action, dependencies }) => {
  useEffect(() => {
    listenToLocation({ location: `/events/${eventId}/comments`, action: action });
  }, dependencies || []);
};

export default useListenToEventComments;
