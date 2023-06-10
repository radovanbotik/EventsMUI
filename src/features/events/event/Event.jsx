/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventInfo from "./EventInfo";
import EventChat from "./EventChat";
import EventGuests from "./EventGuests";
import EventForm from "../../../features/events/form/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Stack, Divider, Typography, Container } from "@mui/material";
import useSubscribeToEvent from "../../../hooks/useSubscribeToEvent";
import { loadEvents } from "../../../store/eventSlice";
import PageLoader from "../../../common/loaders/PageLoader";
import EventImageMap from "./EventImageMap";
import EventActionsAndDate from "./EventActionsAndDate";

const Event = () => {
  const { events, status, filterOptions } = useSelector((store) => store.eventReducer);
  const { id } = useParams();
  const event = events?.find((event) => event.id === id);
  const dispatch = useDispatch();
  const [mapOpen, setMapOpen] = useState(false);
  function toggleMap() {
    setMapOpen((prev) => !prev);
  }

  useSubscribeToEvent({
    eventId: id,
    action: (doc) => dispatch(loadEvents([doc])),
    dependancies: [id],
  });

  if (status === "loading" || !event) {
    return <PageLoader />;
  }
  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <EventImageMap {...event} mapOpen={mapOpen} />
        <Divider />
        <EventActionsAndDate event={event} />
        <EventInfo {...event} toggleMap={toggleMap} mapOpen={mapOpen} />
        <Divider />
        <EventGuests {...event} filterOptions={filterOptions} />
        <Divider />
        <Typography>{event.description}</Typography>
        <Divider />
        <EventChat {...event} />
      </Stack>
    </Container>
  );
};

export default Event;
