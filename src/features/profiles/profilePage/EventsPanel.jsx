import React, { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import EventsInnerTabs from "./EventsInnerTabs";
import useSubscribeTocollection from "../../../hooks/useSubscribeTocollection";

const EventsPanel = ({ id }) => {
  const [attendanceType, setAttendanceType] = useState("hosting");
  const [events, setEvents] = useState(null);
  const handleChange = (event, newValue) => {
    setAttendanceType(newValue);
  };

  useSubscribeTocollection({
    filter: { attendanceType: attendanceType, date: new Date(), id: id },
    collectionRef: "events",
    action: (events) => setEvents(events),
    dependancies: [attendanceType, id],
  });
  return (
    <div>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <AccountCircle sx={{ mr: 2 }} />
          <Typography sx={{ mr: "auto" }}>Events</Typography>
        </Toolbar>
      </AppBar>
      <EventsInnerTabs attendanceType={attendanceType} handleChange={handleChange} events={events} />
    </div>
  );
};

export default EventsPanel;
