import { Divider, Stack, Typography, Box } from "@mui/material";
import Author from "../../dashboard/common/Author";
import Title from "./Title";
import Favourited from "./Favourited";
import Attendees from "./Attendees";
import Date from "./Date";
import Guests from "./Guests";
import Location from "./Location";

const Content = ({ event }) => {
  console.log(event);
  if (!event) {
    return <div>loading...</div>;
  }
  return (
    <Stack direction="column" spacing={4}>
      <Stack direction="column" spacing={2}>
        <Title title={event.title} />
        <Typography paragraph>{event.description}</Typography>
      </Stack>
      <Stack direction="row">
        <Favourited favorited={event.likesId} />
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Attendees attendees={event.attendees} />
      </Stack>
      <Author hostPhotoURL={event.hostPhotoURL} hostId={event.hostId} hostedBy={event.hostedBy} />
      <Divider />
      {/* Location,Date */}
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Date date={event.date} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Location location={event.location} />
        </Stack>
        <Guests attendees={event.attendees} />
      </Stack>
    </Stack>
  );
};

export default Content;
