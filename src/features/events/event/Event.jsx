/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventHeader from "./EventHeader";
import EventInfo from "./EventInfo";
import EventChat from "./EventChat";
import EventGuests from "./EventGuests";
import EventForm from "../../../features/events/form/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Stack, Divider, Typography } from "@mui/material";
import useSubscribeTodocument from "../../../hooks/useSubscribeTodocument";
import { loadEvents } from "../../../store/eventSlice";
import PageLoader from "../../../common/loaders/PageLoader";

const Event = () => {
  const { events, status } = useSelector(store => store.eventReducer);
  const { isEditing } = useSelector(store => store.formReducer);
  const { id } = useParams();
  const event = events?.find(event => event.id === id);
  const dispatch = useDispatch();
  const [mapOpen, setMapOpen] = useState(false);
  function toggleMap() {
    setMapOpen(prev => !prev);
  }

  useSubscribeTodocument({
    dbcollection: "events",
    documentId: id,
    data: doc => dispatch(loadEvents([doc])),
    dependancies: [id],
  });

  if (status === "loading" || !event) {
    return <PageLoader />;
  }
  return (
    <Grid container spacing={2} columns={{ xs: 6, lg: 12 }}>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <EventHeader id={id} event={event} mapOpen={mapOpen} />
          <Divider />
          <EventInfo {...event} toggleMap={toggleMap} mapOpen={mapOpen} />
          <Divider />
          <EventGuests attendees={event.attendees} />
          <Divider />
          <Typography>{event.description}</Typography>
          <Divider />
          <EventChat {...event} />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        {isEditing && <EventForm />}
        hello here
      </Grid>
    </Grid>
  );
};

export default Event;
