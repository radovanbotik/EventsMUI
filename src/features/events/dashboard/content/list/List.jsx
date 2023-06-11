import { Box } from "@mui/material";
import Card from "./Card";

const EventsList = ({ events }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4 }}>
      {events.map((event) => (
        <Card key={event.id} event={event} />
      ))}
    </Box>
  );
};

export default EventsList;
