import { Card, CardHeader, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

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
