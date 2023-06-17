/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Stack, Divider, Typography, Container, Button } from "@mui/material";
import useSubscribeToEvent from "../../../hooks/useSubscribeToEvent";
import { loadEvents } from "../../../store/eventSlice";
import PageLoader from "../../../common/loaders/PageLoader";
import Header from "./header/Header";
import BreadCrumbs from "./BreadCrumbs";
import Map from "./map/Map";
import Chat from "./comments/Comments";
import Summary from "./Summary";
import BgImage from "../../events/dashboard/common/BgImage";

const Event = () => {
  const { events, status, filterOptions } = useSelector((store) => store.eventReducer);
  const { currentUser } = useSelector((store) => store.authReducer);
  const { id } = useParams();
  const event = events?.find((event) => event.id === id);
  const dispatch = useDispatch();

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
        {/* Basic Info + Emage */}
        <Grid container spacing={10}>
          <Grid item xs={12} md={7}>
            <Header event={event} />
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ minHeight: "300px", height: "100%", borderRadius: "10px", overflow: "hidden" }}>
              <BgImage image={event.photoURL} />
            </Box>
          </Grid>
        </Grid>
        {/* Map + Author and Actions */}
        <Grid container spacing={10}>
          <Grid item xs={12} md={7}>
            <Box sx={{ minHeight: "300px", height: "100%", borderRadius: "10px", overflow: "hidden" }}>
              <Map location={event.location} />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Summary event={event} user={currentUser} />
          </Grid>
        </Grid>
        {/* Chat */}
        <Chat {...event} />
      </Stack>
    </Container>
  );
};

export default Event;
