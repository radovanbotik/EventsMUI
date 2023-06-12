import { Stack, Typography, Box } from "@mui/material";
import Image from "mui-image";
import trnava from "../../../../../common/images/trnava.webp";
import { Link } from "react-router-dom";
import Date from "../../common/Date";
import BgImage from "../../common/BgImage";

const RecentPost = ({ event }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ width: 80, height: 80, borderRadius: "10px", overflow: "hidden" }}>
        <BgImage image={event.photoURL} />
      </Box>

      <Stack direction="column" sx={{ color: "text.secondary" }}>
        <Typography
          component={Link}
          to={`event/${event.id}`}
          sx={{
            textDecoration: "none",
            color: "text.primary",
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
