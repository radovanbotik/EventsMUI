import { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import EventsInnerTabs from "./EventsInnerTabs";
import useSubscribeToUserEvents from "../../../hooks/useSubscribeToUserEvents";

const EventsPanel = ({ id }) => {
  const [tab, setTab] = useState("hosting");
  const [events, setEvents] = useState(null);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useSubscribeToUserEvents({
    tab: tab,
    userId: id,
    action: (events) => setEvents(events),
    dependancies: [id, tab],
  });
  return (
    <div>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <AccountCircle sx={{ mr: 2 }} />
          <Typography sx={{ mr: "auto" }}>Events</Typography>
        </Toolbar>
      </AppBar>
      <EventsInnerTabs tab={tab} handleChange={handleChange} events={events} />
    </div>
  );
};

export default EventsPanel;
