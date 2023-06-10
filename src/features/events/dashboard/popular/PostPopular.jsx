import { Box, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import trnava from "../../../../common/images/trnava.webp";
import { Link } from "react-router-dom";

const PostPopular = ({ event }) => {
  return (
    <Box
      sx={{ borderRadius: "10px", overflow: "hidden", position: "relative" }}
      component={Link}
      to={`event/${event.id}`}
    >
      <Image src={trnava} style={{ aspectRatio: 1 / 1 }} />
      <Box
        className="shade-gradient-overlay"
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
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
