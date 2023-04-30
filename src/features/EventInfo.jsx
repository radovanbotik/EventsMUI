import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  CardActions,
  Button,
} from "@mui/material";

const EventInfo = ({ description, date, venue }) => {
  return (
    <Card>
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={description} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={date} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={venue} />
          </ListItem>
          <Divider />
        </List>
      </CardContent>
      <CardActions>
        <Button variant="contained">Show on map</Button>
      </CardActions>
    </Card>
  );
};

export default EventInfo;
