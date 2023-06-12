import { Box, Stack } from "@mui/material";
import BgImage from "../../common/BgImage";
import Date from "../../common/Date";
import Title from "../../common/Title";
import Author from "../../common/Author";

const Card = ({ event }) => {
  return (
    <Stack direction="column" spacing={2}>
      <Box sx={{ borderRadius: "10px", overflow: "hidden" }}>
        <BgImage image={event.photoURL} />
      </Box>
      <Stack direction="column" spacing={0.5} sx={{ color: "text.primary" }}>
        <Date date={event.date} />
        <Title title={event.title} id={event.id} />
        <Author hostPhotoURL={event.hostPhotoURL} hostId={event.hostId} hostedBy={event.hostedBy} />
      </Stack>
    </Stack>
  );
};

export default Card;
