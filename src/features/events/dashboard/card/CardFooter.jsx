import { CardActions, ButtonBase, Stack, AvatarGroup, Avatar, Typography } from "@mui/material";
import getNamesOfAttendees from "../../../../common/util/getNamesOfAttendees";
import { Link } from "react-router-dom";

const CardFooter = ({ id, attendees, filterOptions, date }) => {
  const AVATAR_MAX = 3;

  const avatarGroupStyles = {
    "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 14 },
    gap: 1,
  };

  const buttonStyles = {
    fontWeight: 500,
    textTransform: "none",
    color: "text.primary",
    fontSize: "body2.fontSize",
  };

  const attendeesNames = getNamesOfAttendees({
    totalAttendees: 2,
    attendees: attendees,
    date: date,
  });
  return (
    <CardActions>
      <Stack sx={{ flex: 1 }} direction={{ xs: "column", md: "row" }} alignItems={{ md: "flex-end", xs: "flex-start" }}>
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "flex-end", mr: "auto" }}>
          <AvatarGroup max={AVATAR_MAX} total={attendees.length} spacing="small" sx={avatarGroupStyles}>
            {attendees.slice(0, AVATAR_MAX).map((attendee) => (
              <Avatar key={attendee.id} aria-label="host" src={attendee.photoURL} imgProps={{ loading: "lazy" }} />
            ))}
          </AvatarGroup>
          <Typography variant="body2" color="text.secondary">
            {attendeesNames}
          </Typography>
        </Stack>
        <ButtonBase component={Link} to={`event/${id}`} sx={buttonStyles} size="regular" variant="text">
          View Event
        </ButtonBase>
      </Stack>
    </CardActions>
  );
};

export default CardFooter;
