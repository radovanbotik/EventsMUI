import { Stack, Typography } from "@mui/material";

const Attendees = ({ attendees }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="span" sx={{ fontWeight: 600, mr: 1 }}>
        {attendees.length}
      </Typography>
      <Typography variant="body2">{attendees.length > 1 ? "attendees" : "attendee"}</Typography>
    </Stack>
  );
};

export default Attendees;
