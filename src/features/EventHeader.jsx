import { useDispatch, useSelector } from "react-redux";
import { closeForm, editingTrue, editingFalse, setEvent, resetEvent, setValues, resetValues } from "../store/formSlice";
import dayjs from "dayjs";
import Map from "./Map";
import { Card, CardMedia, Typography, CardActions, CardContent, Box, Button } from "@mui/material";
import { cancelEv } from "../store/eventSlice";
import DescriptionAlert from "./DescriptionAlert";
import { useState } from "react";
import Confirmation from "./Confirmation";

const EventHeader = ({ title, date, hostedBy, eventPhotoURL, event, mapOpen }) => {
  const { events } = useSelector(store => store.eventReducer);
  const [currentEvent] = events;
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleClickOpen = () => {
    setConfirmationOpen(true);
  };

  const handleClose = () => {
    setConfirmationOpen(false);
  };

  const cancelEvent = () => {
    dispatch(cancelEv(event));
  };

  const dispatch = useDispatch();
  return (
    <Card>
      <Confirmation
        open={confirmationOpen}
        handleClose={handleClose}
        cancelEvent={cancelEvent}
        title={currentEvent.canceled ? "Activating an event" : "Cancelling an event"}
        content={`This action will ${
          currentEvent.canceled ? "activate" : "cancel"
        } the current event. Do you wish to procceed?`}
      />
      <CardMedia
        component="img"
        image={
          eventPhotoURL ||
          "https://www.priateliazoo.sk/assets/GalleryImages/Gallery16/medved_hnedy1__FillMaxWzc0MCw0MDBd.JPG"
        }
        height={300}
        sx={{ display: mapOpen ? "none" : "block" }}
      />
      <CardMedia sx={{ display: mapOpen ? "block" : "none", height: "300px", width: "100%" }}>
        <Map event={event} />
      </CardMedia>
      <CardContent>
        <Typography variant="h4">{title}</Typography>
        <Typography>{dayjs(date).format("DD MMM YYYY, HH:mm")}</Typography>
        <Typography>Hosted by {hostedBy}</Typography>
        {currentEvent.canceled && (
          <DescriptionAlert
            severity={"warning"}
            title={"Cancelled"}
            description={"This event has been canceled by user."}
            emp={"You can't join this event."}
            variant={"filled"}
          />
        )}
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" color="secondary" type="button" onClick={handleClickOpen}>
              {currentEvent.canceled ? "re-active event" : "cancel event"}
            </Button>

            {!currentEvent.canceled && <Button variant="contained">Join Event</Button>}
          </Box>
          <Box>
            <Button
              type="button"
              variant="contained"
              color="warning"
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
