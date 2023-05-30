import { List, ListItemText, ListItem, Button } from "@mui/material";
import isExpired from "../../../common/util/isExpired";

const EventGuests = ({ attendees, filterOptions, date }) => {
  function formatGuests({ guestCount = 0, date }) {
    switch (isExpired(date)) {
      case true: {
        if (guestCount === 0) return "No guests.";
        if (guestCount === 1) return "1 person went.";
        if (guestCount > 1) return `${guestCount} people went.`;
        break;
      }

      default: {
        if (guestCount === 0) return "No guests yet.";
        if (guestCount === 1) return "1 person is going";
        if (guestCount > 1) return `${guestCount} people are going`;
        break;
      }
    }
  }

  return (
    <List>
      <ListItem disablePadding>
        {/* <ListItemAvatar>
            <Place sx={{ color: "grey" }} />
          </ListItemAvatar> */}
        <ListItemText
          primaryTypographyProps={{ fontWeight: 500 }}
          primary={formatGuests({ guestCount: attendees?.length, date: date })}
          secondary={"invite other people to this event."}
        />
        <Button size="small" sx={{ textTransform: "capitalize" }}>
          Invite
        </Button>
      </ListItem>
      {/* <Divider /> */}
    </List>
  );
};

export default EventGuests;
