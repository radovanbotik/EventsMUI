import React from "react";
import { Stack, Toolbar, Box, CircularProgress, Typography } from "@mui/material";
import EventCard from "../dashboard/EventCard";

const EventList = ({ events }) => {
  if (!events)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Toolbar>
          <Typography variant="h5">Events:</Typography>
        </Toolbar>
        <Box sx={{ display: "grid", placeItems: "center", flex: 1, flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  return (
    <>
      <Toolbar>
        <Typography variant="h5">Events:</Typography>
      </Toolbar>
      <Stack spacing={4}>
        {events.map(entry => {
          return <EventCard key={entry.id} event={entry} />;
        })}
      </Stack>
    </>
  );
};

export default EventList;
