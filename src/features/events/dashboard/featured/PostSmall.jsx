/* eslint-disable react/prop-types */
import { Box, Stack } from "@mui/material";
import Date from "../common/Date";
import Title from "../common/Title";
import Author from "../common/Author";
import BgImageWithOverlay from "../common/BgImageWithOverlay";

const PostSmall = ({ event }) => {
  return (
    <Box sx={{ borderRadius: "10px", overflow: "hidden", position: "relative" }}>
      <BgImageWithOverlay image={event.photoURL} />
      <Stack
        spacing={1}
        useFlexGap
        sx={{ position: "absolute", bottom: 0, width: "100%", padding: { xs: 2, lg: 4 }, color: "white" }}
      >
        <Date date={event.date} />
        <Title title={event.title} id={event.id} />
        <Author hostId={event.hostId} hostPhotoURL={event.hostPhotoURL} hostedBy={event.hostedBy} />
      </Stack>
    </Box>
  );
};

export default PostSmall;
