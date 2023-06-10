import React from "react";
import { Box } from "@mui/material";
import Event from "./Event";

const Events = ({ events }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 }}>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </Box>
  );
};

export default Events;
