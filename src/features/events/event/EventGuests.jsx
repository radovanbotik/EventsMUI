import { List, ListItemText, Divider, ListItem, Button } from "@mui/material";
import { Link } from "react-router-dom";

const EventGuests = ({ attendees }) => {
  console.log(attendees);
  function formatGuests(guestCount = 0) {
    if (guestCount === 0) return "No guests yet.";
    if (guestCount === 1) return "1 person is going";
    if (guestCount > 1) return `${guestCount} people are going`;
  }

  return (
    <List>
      <ListItem disablePadding>
        {/* <ListItemAvatar>
            <Place sx={{ color: "grey" }} />
          </ListItemAvatar> */}
        <ListItemText primary={formatGuests(attendees?.length)} secondary={"invite other people to this event."} />
        <Button size="small" sx={{ textTransform: "capitalize" }}>
          Invite
        </Button>
      </ListItem>
      <Divider />
    </List>
  );
};

export default EventGuests;
