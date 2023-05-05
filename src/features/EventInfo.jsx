/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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

const EventInfo = ({ description, date, venue, city, country, location, toggleMap, mapOpen }) => {
  console.log(mapOpen);
  // const { Geocoder } = await google.maps.importLibrary("geocoding");

  //https://developers.google.com/maps/documentation/javascript/reference/geocoder
  // const geocoder = new google.maps.Geocoder();
  // if (location) {
  //   console.log(
  //     geocoder.geocode({ placeId: location.place_id }).then(({ results }) => {
  //       console.log(results);
  //       console.log(results[0].geometry.location.lat());
  //       console.log(results[0].geometry.location.lng());
  //     })
  //   );
  // }
  // const marker = new google.maps.Marker({ map: map });

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
