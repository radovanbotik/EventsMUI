import { Box } from "@mui/material";
import Map from "./map/Map";
import noImage from "../../../common/images/noImage.avif";

const EventImageMap = ({ eventPhotoURL, mapOpen, location }) => {
  return (
    <Box sx={{ position: "relative", height: 300, width: "100%" }}>
      <Box
        component="img"
        src={eventPhotoURL || noImage}
        sx={{ display: mapOpen ? "none" : "block", objectFit: "contain", width: "100%", height: "100%" }}
      />
      <Box sx={{ display: mapOpen ? "block" : "none", height: "300px", width: "100%" }}>
        <Map location={location} />
      </Box>
    </Box>
  );
};

export default EventImageMap;
