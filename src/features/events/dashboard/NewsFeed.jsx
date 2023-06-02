import defaultImage from "../../../common/images/defaultPhoto.jpg";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import useListenToNewsfeed from "../../../hooks/useListenToNewsfeed";
import { useState } from "react";
import formatTime from "../../../common/util/formatDateCalendar";

const NewsFeed = ({ userId }) => {
  const [feed, setFeed] = useState(null);

  const user = {
    id: 1,
    image: defaultImage,
    date: "3 days ago",
    summary: "Rado has just joined Event Name",
  };
  const users = [user, user, user];

  useListenToNewsfeed({
    userId: userId,
    action: (posts) => setFeed(posts),
    dependancies: [userId],
  });

  console.log(feed);
  if (!feed)
    return (
      <Box>
        <Typography>No news to display</Typography>
      </Box>
    );

  return (
    <>
      {/* <AppBar sx={{ position: "static" }}>
        <Toolbar variant="dense">
          <Typography>News feed:</Typography>
        </Toolbar>
      </AppBar> */}
      <List subheader={<ListSubheader>News feed</ListSubheader>}>
        {feed.map((post) => (
          <ListItem key={post.userId}>
            <ListItemAvatar>
              <Avatar src={post.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={`${post.displayName} ${post.action}`}
              secondary={formatTime(post.date).toX}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NewsFeed;
