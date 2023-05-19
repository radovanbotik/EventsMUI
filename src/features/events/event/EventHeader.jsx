import { useDispatch, useSelector } from "react-redux";
import { editingTrue, setEvent } from "../../../store/formSlice";
import dayjs from "dayjs";
import Map from "./map/Map";
import { Link, Card, CardMedia, Typography, CardActions, CardContent, Box, Button } from "@mui/material";
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
    <Card>
      <Confirmation
        open={confirmationOpen}
        handleClose={handleClose}
        onSubmit={cancelEvent}
        title={currentEvent.cancelled ? "Activating an event" : "Cancelling an event"}
        content={`This action will ${
          currentEvent.cancelled ? "activate" : "cancel"
        } the current event. Do you wish to procceed?`}
      />
      <CardMedia
        component="img"
        image={eventPhotoURL || noImage}
        height={300}
        sx={{ display: mapOpen ? "none" : "block" }}
      />
      <CardMedia sx={{ display: mapOpen ? "block" : "none", height: "300px", width: "100%" }}>
        <Map event={event} />
      </CardMedia>
      <CardContent>
        <Typography variant="h4">{title}</Typography>
        <Typography>{dayjs(date).format("DD MMM YYYY, HH:mm")}</Typography>
        <Typography>
          Hosted by
          <Link component={RLink} to={`/users/profile/${hostId}`}>
            {hostedBy}
          </Link>
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
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" color="warning" type="button" onClick={handleClickOpen}>
              {currentEvent.cancelled ? "re-active event" : "cancel event"}
            </Button>

            {!currentEvent.cancelled && (
              <>
                {isAttending ? (
                  <Button variant="contained" color="warning" onClick={() => dispatch(leaveEvent(id))}>
                    Leave event
                  </Button>
                ) : (
                  <Button variant="contained" onClick={() => dispatch(joinEvent(id))}>
                    Join Event
                  </Button>
                )}
              </>
            )}
          </Box>
          <Box>
            <Button
              type="button"
              variant="contained"
              color="info"
              onClick={() => {
                dispatch(editingTrue());
                dispatch(setEvent(event));
              }}
            >
              Manage Event
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default EventHeader;
