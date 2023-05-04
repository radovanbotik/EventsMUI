/* eslint-disable react/prop-types */
import { Card, CardMedia, Typography, CardActions, CardContent, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeForm, editingTrue, editingFalse, setEvent, resetEvent, setValues, resetValues } from "../store/formSlice";
import dayjs from "dayjs";
import { GoogleMap } from "./RenderMap";

const EventHeader = ({ title, date, hostedBy, eventPhotoURL, event, mapOpen }) => {
  const dispatch = useDispatch();
  return (
    <Card>
      <CardMedia
        component="img"
        image={
          eventPhotoURL ||
          "https://www.priateliazoo.sk/assets/GalleryImages/Gallery16/medved_hnedy1__FillMaxWzc0MCw0MDBd.JPG"
        }
        height={300}
        sx={{ display: mapOpen ? "none" : "block" }}
      />
      <CardMedia height={300} sx={{ display: mapOpen ? "block" : "none" }}>
        <GoogleMap event={event} />
      </CardMedia>
      <CardContent>
        <Typography variant="h4">{title}</Typography>
        <Typography>{dayjs(date).format("DD MMM YYYY, HH:mm")}</Typography>
        <Typography>Hosted by {hostedBy}</Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" color="secondary">
              Cancel Event
            </Button>
            <Button variant="contained">Join Event</Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(editingTrue());
                dispatch(setEvent(event));
              }}
            >
              Manage Event
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default EventHeader;
