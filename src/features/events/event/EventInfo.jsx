import { Event, Place, Info } from "@mui/icons-material";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  CardActions,
  Button,
} from "@mui/material";

const EventInfo = ({ description, date, venue, city, country, location, toggleMap, mapOpen }) => {
  return (
    <Card>
      <CardContent>
        <List dense>
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
            <ListItemText primary={"Date"} secondary={dayjs(date).format("DD MMM YYYY, HH:mm")} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Place />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Location"} secondary={location ? location.description : `${city},${country}`} />
          </ListItem>
          <Divider />
        </List>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={toggleMap} component={"a"} href="#">
          {mapOpen ? "Close map" : "Show on map"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventInfo;
