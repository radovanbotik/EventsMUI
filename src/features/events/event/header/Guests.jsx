import { Divider, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const Guests = ({ attendees }) => {
  return (
    <Stack direction="row" sx={{ alignItems: "center" }}>
      <AvatarGroup total={attendees.length} sx={{ ".MuiAvatarGroup-avatar": { height: 24, width: 24, fontSize: 10 } }}>
        {attendees.slice(0, 2).map((attendee) => (
          <Avatar key={attendee.id} src={attendee.photoURL} sx={{ height: 24, width: 24 }} />
        ))}
      </AvatarGroup>
      <Divider sx={{ mr: 1 }} />
      {attendees.slice(0, 2).map((attendee) => (
        <Typography variant="body2" key={attendee.id}>
          {attendee.displayName.split(" ")[0]} &nbsp;
        </Typography>
      ))}
      {attendees.length < 2 && <Typography variant="body2">is going</Typography>}
      {attendees.length >= 2 && <Typography variant="body2">and {attendees.length - 2} other guests.</Typography>}
    </Stack>
  );
};

export default Guests;
