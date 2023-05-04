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
import dayjs from "dayjs";

const EventInfo = ({ description, date, venue, city, country }) => {
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
            <ListItemText primary={"Date"} secondary={dayjs(date).format("DD MMM YYYY, HH:mm")} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Place />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Location"} secondary={`${city},${country}`} />
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
