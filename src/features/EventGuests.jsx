/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

const EventGuests = ({ attendees }) => {
  function formatGuests(guestCount = 0) {
    if (guestCount === 0) return "No guests yet.";
    if (guestCount === 1) return "1 person is going";
    if (guestCount > 1) return `${guestCount} people are going`;
  }

  return (
    <Card sx={{ p: 2 }}>
      <CardHeader
        title={formatGuests(attendees?.length || 0)}
        sx={{ textAlign: "center", bgcolor: "primary.main" }}
      ></CardHeader>
      <CardContent>
        <List>
          {attendees?.map(att => (
            <ListItem divider key={att.id}>
              <ListItemAvatar>
                <Avatar src={att.photoURL} />
              </ListItemAvatar>
              <ListItemText primary={att.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default EventGuests;
