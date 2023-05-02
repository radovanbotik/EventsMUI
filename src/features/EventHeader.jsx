/* eslint-disable react/prop-types */
import { Card, CardMedia, Typography, CardActions, CardContent, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeForm, editingTrue, editingFalse, setEvent, resetEvent, setValues, resetValues } from "../store/formSlice";

const EventHeader = ({ title, date, hostedBy, eventPhotoURL, event }) => {
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
      />
      <CardContent>
        <Typography variant="h4">{title}</Typography>
        <Typography>{date}</Typography>
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
