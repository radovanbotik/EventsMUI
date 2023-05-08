/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { closeForm, editingTrue, editingFalse, setEvent, resetEvent, setValues, resetValues } from "../store/formSlice";
import dayjs from "dayjs";
import Map from "./Map";
// import { GoogleMap } from "./RenderMap";
// import MapAndMarker from "./MapAndMarker";

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
      <CardMedia sx={{ display: mapOpen ? "block" : "none", height: "300px", width: "100%" }}>
        <Map event={event} />
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
