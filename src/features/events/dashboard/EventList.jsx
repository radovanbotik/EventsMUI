import {
  Stack,
  Toolbar,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import EventCard from "../dashboard/card/EventCard";

const EventList = ({ events }) => {
  if (!events)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
            flex: 1,
            flexGrow: 1,
          }}
        >
          <Typography variant="body2">Your content is loading...</Typography>
          <CircularProgress />
        </Box>
      </Box>
    );
  if (events.length === 0)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Toolbar>
          <Typography variant="body2">
            No events matching the criteria.
          </Typography>
        </Toolbar>
      </Box>
    );
  return (
    <>
      <Stack spacing={2}>
        {events.map((entry) => {
          return <EventCard key={entry.id} event={entry} />;
        })}
      </Stack>
    </>
  );
};

export default EventList;
