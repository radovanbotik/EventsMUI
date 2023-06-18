import { Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const Guests = ({ attendees }) => {
  return (
    <Stack direction="row" sx={{ alignItems: "center", alignContent: "center" }} spacing={1}>
      <AvatarGroup total={attendees.length} sx={{ ".MuiAvatarGroup-avatar": { height: 24, width: 24, fontSize: 10 } }}>
        {attendees.slice(0, 2).map((attendee) => (
          <Avatar key={attendee.id} src={attendee.photoURL} sx={{ height: 24, width: 24 }} />
        ))}
      </AvatarGroup>
      <Typography variant="body2" paragraph>
        {attendees[0]?.displayName.split(" ")[0]} {attendees[1] ? " , " : null}
        {attendees[1]?.displayName.split(" ")[0]} {attendees[2] ? " and " : null}
        {attendees.length < 2 && "is going."}
        {attendees.length === 2 && "are going."}
        {attendees.length > 2 && `${attendees.length - 2} other ${attendees.length === 3 ? "guest." : "guests."}`}
      </Typography>
    </Stack>
  );
};

export default Guests;
