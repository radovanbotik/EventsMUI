import { Box, Stack } from "@mui/material";
import Image from "mui-image";
import trnava from "../../../../common/images/trnava.webp";
import Date from "./Date";
import Title from "./Title";
import User from "./User";

const PostSmall = ({ event }) => {
  return (
    <Box sx={{ borderRadius: "10px", overflow: "hidden", position: "relative" }}>
      <Image src={trnava} style={{ aspectRatio: 1 / 1 }} />
      <Box
        className="shade-gradient-overlay"
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
      <Stack
        spacing={1}
        useFlexGap
        sx={{ position: "absolute", bottom: 0, width: "100%", padding: { xs: 2, lg: 4 }, color: "white" }}
      >
        <Date date={event.date} />
        <Title title={event.title} id={event.id} />
        <User hostId={event.hostId} hostPhotoURL={event.hostPhotoURL} hostedBy={event.hostedBy} />
      </Stack>
    </Box>
  );
};

export default PostSmall;
