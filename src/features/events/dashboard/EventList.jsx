import React from "react";
import { Stack, Toolbar, Box, CircularProgress, Typography } from "@mui/material";
import EventCard from "../dashboard/EventCard";

const EventList = ({ events }) => {
  if (!events)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Toolbar>
          <Typography variant="h6">Events:</Typography>
        </Toolbar>
        <Box sx={{ display: "grid", placeItems: "center", flex: 1, flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  if (events.length === 0)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Toolbar>
          <Typography variant="h6">No events to be displayed.</Typography>
        </Toolbar>
      </Box>
    );
  return (
    <>
      <Stack spacing={2}>
        {events.map(entry => {
          return <EventCard key={entry.id} event={entry} />;
        })}
      </Stack>
    </>
  );
};

export default EventList;
