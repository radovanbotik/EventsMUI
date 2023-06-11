/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import Date from "../common/Date";
import Title from "../common/Title";
import Description from "../common/Description";
import Author from "../common/Author";
import BgImageWithOverlay from "../common/BgImageWithOverlay";

const Post = ({ event }) => {
  return (
    <Box sx={{ height: "100%", width: "100%", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
      <BgImageWithOverlay />
      <Stack spacing={1} useFlexGap sx={{ position: "absolute", bottom: 0, width: "100%", p: 4, color: "white" }}>
        <Date date={event.date} />
        <Title title={event.title} id={event.id} />
        <Description description={event.description} />
        <Author hostPhotoURL={event.hostPhotoURL} hostId={event.hostId} hostedBy={event.hostedBy} />
      </Stack>
    </Box>
  );
};

export default Post;
