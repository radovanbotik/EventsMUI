import { Divider, Stack, Typography, Box } from "@mui/material";
import Author from "../../../dashboard/common/Author";
import { AccessTimeOutlined, PlaceOutlined, PeopleOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import formatTime from "../../../../../common/util/formatDateCalendar";
import { pink } from "@mui/material/colors";

const Content = ({ event }) => {
  console.log(event);
  if (!event) {
    return <div>loading...</div>;
  }
  return (
    <Stack direction="column" spacing={4}>
      <Stack direction="column" spacing={2}>
        <Typography
          variant="caption"
          color="primary"
          sx={{ mixBlendMode: "difference", fontWeight: 600, textTransform: "uppercase" }}
        >
          Event Title
        </Typography>
        <Typography variant="h3" sx={{ ":first-letter": { textTransform: "capitalize" } }}>
          {event.title}
        </Typography>
        <Typography paragraph>{event.description}</Typography>
      </Stack>
      <Stack direction="row">
        <Stack direction="row" alignItems="center">
          <FavoriteBorderOutlined fontSize="small" sx={{ color: pink[400] }} />
          <Typography variant="span" sx={{ fontWeight: 600, mx: 1 }}>
            10
          </Typography>
          <Typography variant="body2">favourited</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
        <Stack direction="row" alignItems="center">
          <Typography variant="span" sx={{ fontWeight: 600, mr: 1 }}>
            {event.attendees.length}
          </Typography>
          <Typography variant="body2">{event.attendees.length > 1 ? "attendees" : "attendee"}</Typography>
        </Stack>
      </Stack>
      <Author hostPhotoURL={event.hostPhotoURL} hostId={event.hostId} hostedBy={event.hostedBy} />
      <Divider />
      {/* Location,Date */}
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeOutlined fontSize="small" />
            <Typography variant="body2">{formatTime(event.date).calendar}</Typography>
            <Typography variant="body2">{formatTime(event.date).toX}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <PeopleOutlined fontSize="small" />
            <Typography variant="body2">{event.attendees.length}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PlaceOutlined fontSize="small" />
            <Typography variant="body2">{event.location.description}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Content;
