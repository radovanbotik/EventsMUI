import { Grid, Box, Stack } from "@mui/material";
import { useParams, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import EventHeader from "../features/EventHeader";
import EventInfo from "../features/EventInfo";
import EventChat from "../features/EventChat";
import EventGuests from "../features/EventGuests";

export const loader = async ({ request, params }) => {
  console.log(params);
  return params;
};

const Event = () => {
  const { events } = useSelector(store => store.eventReducer);
  const { id } = useLoaderData();

  const event = events.find(event => event.id === id);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8} columns={{ xs: 6, lg: 12 }}>
        <Grid item lg={8} xs={6}>
          <Stack spacing={2}>
            <EventHeader {...event} />
            <EventInfo {...event} />
            <EventChat />
          </Stack>
        </Grid>
        <Grid item lg={4} xs={6}>
          <EventGuests attendees={event.attendees} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Event;
