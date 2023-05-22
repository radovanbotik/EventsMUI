/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import EventHeader from "./EventHeader";
import EventInfo from "./EventInfo";
import EventChat from "./EventChat";
import EventGuests from "./EventGuests";
import EventForm from "../../../features/events/form/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Stack, Divider, Typography } from "@mui/material";
import useSubscribeTodocument from "../../../hooks/useSubscribeTodocument";
import { loadEvents } from "../../../store/eventSlice";

const Event = () => {
  const { events, status } = useSelector(store => store.eventReducer);
  const { isEditing } = useSelector(store => store.formReducer);
  const { id } = useParams();
  //only if events is populated events?.find
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

  return (
    <>
      {status === "loading" || (!event && status !== "error") ? (
        <div>loading...</div>
      ) : (
        <Grid container spacing={2} columns={{ xs: 6, lg: 12 }} p={4}>
          <Grid item lg={8} xs={6}>
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
          {/* <Divider flexItem orientation="vertical" sx={{ mr: "-1px" }} /> */}
          <Grid item lg={4} xs={6}>
            {isEditing && <EventForm />}
            hello here
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Event;
