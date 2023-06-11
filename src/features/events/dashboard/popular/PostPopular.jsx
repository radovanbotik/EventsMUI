/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BgImageWithOverlay from "../common/BgImageWithOverlay";

const PostPopular = ({ event }) => {
  return (
    <Box
      sx={{ borderRadius: "10px", overflow: "hidden", position: "relative" }}
      component={Link}
      to={`event/${event.id}`}
    >
      <BgImageWithOverlay />
      <Stack
        spacing={1}
        useFlexGap
        sx={{ position: "absolute", padding: { xs: 2, lg: 4 }, color: "white", inset: 0, justifyContent: "end" }}
      >
        <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
          {event.title}
        </Typography>
        <Typography variant="body2">{event.attendees.length} attendees</Typography>
      </Stack>
    </Box>
  );
};

export default PostPopular;
