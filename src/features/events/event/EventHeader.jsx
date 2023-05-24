import { useDispatch, useSelector } from "react-redux";
import { Stack, Divider } from "@mui/material";
import { cancelEv } from "../../../store/eventSlice";
import DescriptionAlert from "../../../common/alerts/DescriptionAlert";
import { useState } from "react";
import Confirmation from "../../../common/dialogs/Confirmation";
import EventImageMap from "./EventImageMap";
import EventDateAndHost from "./EventDateAndHost";
import EventActions from "./EventActions";

const EventHeader = ({ event, mapOpen }) => {
  const { events } = useSelector(store => store.eventReducer);
  const [currentEvent] = events;
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleClose = () => {
    setConfirmationOpen(false);
  };

  const cancelEvent = () => {
    dispatch(cancelEv(event));
    handleClose();
  };

  const askForPermission = () => {
    setConfirmationOpen(true);
  };

  const dispatch = useDispatch();
  return (
    <Stack>
      <Confirmation
        open={confirmationOpen}
        handleClose={handleClose}
        onSubmit={cancelEvent}
        title={currentEvent.cancelled ? "Activating an event" : "Cancelling an event"}
        content={`This action will ${
          currentEvent.cancelled ? "activate" : "cancel"
        } the current event. Do you wish to procceed?`}
      />
      <EventImageMap {...event} mapOpen={mapOpen} />
      <Divider />
      <EventDateAndHost {...event} />
      {currentEvent.cancelled && (
        <DescriptionAlert
          severity={"warning"}
          title={"Cancelled"}
          description={"This event has been cancelled by user."}
          emp={"You can't join this event."}
          variant={"filled"}
        />
      )}
      <EventActions {...event} cancelEvent={cancelEvent} askForPermission={askForPermission} />
    </Stack>
  );
};

export default EventHeader;
