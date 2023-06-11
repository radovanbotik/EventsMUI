import { Stack, Avatar, Typography, Box } from "@mui/material";
import defaultPhoto from "../../../../../common/images/defaultPhoto.jpg";
import formatTime from "../../../../../common/util/formatDateCalendar";
import { Link } from "react-router-dom";

const FeedPost = ({ feedPost }) => {
  const userAction = feedPost.action === "join" ? "joined your event" : "left your event";

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ width: 32, height: 32 }} src={feedPost.photoURL || defaultPhoto} />
      <Stack direction="column">
        <Box>
          <Typography
            component={Link}
            to={`/users/profile/${feedPost.userId}`}
            sx={{ textDecoration: "none", color: "inherit", "&:hover": { textDecoration: "underline" } }}
          >
            {feedPost.displayName}
          </Typography>
          <Typography variant="body2" component="span">
            {` ${userAction} `}
          </Typography>
          <Typography
            noWrap
            component={Link}
            to={`/events/event/${feedPost.eventId}`}
            sx={{ textDecoration: "none", color: "inherit", "&:hover": { textDecoration: "underline" } }}
          >
            {feedPost.title}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {formatTime(feedPost.date).toX}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FeedPost;
