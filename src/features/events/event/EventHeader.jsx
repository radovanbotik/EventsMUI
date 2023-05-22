import { useDispatch, useSelector } from "react-redux";
import { editingTrue, setEvent } from "../../../store/formSlice";
import dayjs from "dayjs";
import Map from "./map/Map";
import {
  Link,
  Card,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Box,
  Button,
  ButtonGroup,
  Stack,
} from "@mui/material";
import { cancelEv, joinEvent, leaveEvent } from "../../../store/eventSlice";
import DescriptionAlert from "../../../common/alerts/DescriptionAlert";
import { useState } from "react";
import Confirmation from "../../../common/dialogs/Confirmation";
import noImage from "../../../common/images/noImage.avif";
import { Link as RLink } from "react-router-dom";

const EventHeader = ({ event, mapOpen }) => {
  const { title, date, hostedBy, eventPhotoURL, hostId, attendeesId, id } = event;

  const { events } = useSelector(store => store.eventReducer);
  const { currentUser } = useSelector(store => store.authReducer);
  const [currentEvent] = events;
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const isAttending = attendeesId && attendeesId?.includes(currentUser?.id);
  const handleClickOpen = () => {
    setConfirmationOpen(true);
  };

  const handleClose = () => {
    setConfirmationOpen(false);
  };

  const cancelEvent = () => {
    dispatch(cancelEv(event));
    handleClose();
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
      <Box sx={{ position: "relative", height: 300, width: "100%" }}>
        <Box
          component="img"
          src={eventPhotoURL || noImage}
          sx={{ display: mapOpen ? "none" : "block", objectFit: "contain", width: "100%", height: "100%" }}
        />
      </Box>
      <Box sx={{ display: mapOpen ? "block" : "none", height: "300px", width: "100%" }}>
        <Map event={event} />
      </Box>
      <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
        {title}
      </Typography>
      <Typography variant="body2">{dayjs(date).format("DD MMM YYYY, HH:mm")}</Typography>
      <Typography variant="body2">
        Hosted by{" "}
        <Typography variant="body2" display="inline" component={RLink} to={`/users/profile/${hostId}`}>
          {hostedBy}
        </Typography>
      </Typography>

      {currentEvent.cancelled && (
        <DescriptionAlert
          severity={"warning"}
          title={"Cancelled"}
          description={"This event has been cancelled by user."}
          emp={"You can't join this event."}
          variant={"filled"}
        />
      )}
      <ButtonGroup sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
        <ButtonGroup sx={{ display: "flex", gap: 1 }}>
          <Button sx={{ p: 0 }} size="small" variant="text" color="warning" type="button" onClick={handleClickOpen}>
            {currentEvent.cancelled ? "re-active event" : "cancel event"}
          </Button>

          {!currentEvent.cancelled && (
            <>
              {isAttending ? (
                <Button size="small" variant="text" color="warning" onClick={() => dispatch(leaveEvent(id))}>
                  Leave event
                </Button>
              ) : (
                <Button size="small" variant="text" onClick={() => dispatch(joinEvent(id))}>
                  Join Event
                </Button>
              )}
            </>
          )}
        </ButtonGroup>
        <Button
          type="button"
          size="small"
          variant="text"
          color="info"
          onClick={() => {
            dispatch(editingTrue());
            dispatch(setEvent(event));
          }}
        >
          Manage Event
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default EventHeader;
