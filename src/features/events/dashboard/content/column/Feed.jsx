import { Typography, Stack } from "@mui/material";
import useListenToNewsfeed from "../../../../../hooks/useListenToNewsfeed";
import { useState } from "react";
import { useSelector } from "react-redux";
import FeedPost from "./FeedPost";

const Feed = () => {
  const [feed, setFeed] = useState(null);
  const {
    currentUser: { id: userId },
  } = useSelector((store) => store.authReducer);

  useListenToNewsfeed({
    userId: userId,
    action: (posts) => setFeed(posts),
    dependancies: [userId],
  });

  if (!feed) return <Typography>No news to display</Typography>;

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        Your feed:
      </Typography>

      {feed.map((feedPost) => (
        <FeedPost key={feedPost.id} feedPost={feedPost} />
      ))}
    </Stack>
  );
};

export default Feed;
