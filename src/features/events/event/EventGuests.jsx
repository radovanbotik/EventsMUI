import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const EventGuests = ({ attendees }) => {
  function formatGuests(guestCount = 0) {
    if (guestCount === 0) return "No guests yet.";
    if (guestCount === 1) return "1 person is going";
    if (guestCount > 1) return `${guestCount} people are going`;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography>{formatGuests(attendees?.length || 0)}</Typography>
        </Toolbar>
      </AppBar>
      <List dense>
        {attendees?.map(att => (
          <ListItemButton component={Link} to={`/users/profile/${att.id}`} divider key={att.id}>
            <ListItemAvatar>
              <Avatar src={att.photoURL} />
            </ListItemAvatar>
            <ListItemText primary={att.name} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default EventGuests;
