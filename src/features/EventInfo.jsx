/* eslint-disable react/prop-types */
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
import { Event, Place, Info } from "@mui/icons-material";

const EventInfo = ({ description, date, venue }) => {
  return (
    <Card>
      <CardContent>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Info />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Information"} secondary={description} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Event />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Date"} secondary={date} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Place />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Location"} secondary={venue} />
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
