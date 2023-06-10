import { Box, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import trnava from "../../../../common/images/trnava.webp";
import Date from "./Date";
import Title from "./Title";
import Description from "./Description";
import User from "./User";

const Post = ({ event }) => {
  return (
    <Box sx={{ height: "100%", width: "100%", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
      <Image src={trnava} style={{ aspectRatio: 1 / 1 }} />
      <Box
        className="shade-gradient-overlay"
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
      <Stack spacing={1} useFlexGap sx={{ position: "absolute", bottom: 0, width: "100%", p: 4, color: "white" }}>
        <Date date={event.date} />
        <Title title={event.title} id={event.id} />
        <Description description={event.description} />
        <User hostPhotoURL={event.hostPhotoURL} hostId={event.hostId} hostedBy={event.hostedBy} />
      </Stack>
    </Box>
  );
};

export default Post;
