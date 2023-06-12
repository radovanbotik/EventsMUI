/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Stack, Divider, Typography, Container, Button } from "@mui/material";
import useSubscribeToEvent from "../../../hooks/useSubscribeToEvent";
import { loadEvents } from "../../../store/eventSlice";
import PageLoader from "../../../common/loaders/PageLoader";
import Body from "./content/body/Body";
import BreadCrumbs from "./BreadCrumbs";
import Image from "./content/image/Image";
import Map from "./map/Map";
import Chat from "./chat/Chat";
import Summary from "./map_and_actions/Summary";

const Event = () => {
  const { events, status, filterOptions } = useSelector((store) => store.eventReducer);
  const { currentUser } = useSelector((store) => store.authReducer);

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
      <Stack direction="column" useFlexGap spacing={10}>
        <BreadCrumbs />
        <Grid container spacing={10}>
          <Grid item xs={12} md={7}>
            <Body event={event} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Image event={event} />
          </Grid>
        </Grid>
        <Grid container spacing={10}>
          <Grid item xs={12} md={8}>
            <Box sx={{ height: "400px", borderRadius: "10px", overflow: "hidden" }}>
              <Map location={event.location} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary event={event} user={currentUser} />
          </Grid>
        </Grid>

        <Chat {...event} />
        {/* <EventChat {...event} /> */}
      </Stack>

      {/* <EventImageMap {...event} mapOpen={mapOpen} />
        <Divider />
        <EventActionsAndDate event={event} />
        <EventInfo {...event} toggleMap={toggleMap} mapOpen={mapOpen} />
        <Divider />
        <EventGuests {...event} filterOptions={filterOptions} />
        <Divider />
        <Typography>{event.description}</Typography>
        <Divider />
        <EventChat {...event} /> */}
    </Container>
  );
};

export default Event;
