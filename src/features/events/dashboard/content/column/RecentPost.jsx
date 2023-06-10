import { Stack, Typography, Box } from "@mui/material";
import Image from "mui-image";
import trnava from "../../../../../common/images/trnava.webp";
import { Link } from "react-router-dom";
import Date from "./Date";

const RecentPost = ({ event }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ width: 80, height: 80, borderRadius: "10px", overflow: "hidden" }}>
        <Image src={trnava} style={{ aspectRatio: 1 / 1 }} />
      </Box>

      <Stack direction="column">
        <Typography
          component={Link}
          to={`event/${event.id}`}
          sx={{
            textDecoration: "none",
            color: "inherit",
            ":first-letter": { textTransform: "capitalize" },
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {event.title}
        </Typography>
        <Date date={event.date} />
      </Stack>
    </Stack>
  );
};

export default RecentPost;
