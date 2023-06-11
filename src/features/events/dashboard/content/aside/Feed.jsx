import { Typography, Stack } from "@mui/material";
import useListenToNewsfeed from "../../../../../hooks/useListenToNewsfeed";
import { useState } from "react";
import { useSelector } from "react-redux";
import FeedPost from "./FeedPost";
import HeadingH6 from "../../common/headingH6";

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
      <HeadingH6>Your feed:</HeadingH6>
      {feed.map((feedPost) => (
        <FeedPost key={feedPost.id} feedPost={feedPost} />
      ))}
    </Stack>
  );
};

export default Feed;
