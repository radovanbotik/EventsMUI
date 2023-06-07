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

  useListenToNewsfeed({
    userId: userId,
    action: (posts) => setFeed(posts),
    dependancies: [userId],
  });

  function userAction({ action, displayName, title }) {
    if (action === "join") {
      return `${displayName} joined your event ${title}.`;
    } else {
      return `${displayName} left your event ${title}. `;
    }
  }

  console.log(feed);
  if (!feed)
    return (
      <Box sx={{ display: "grid", placeContent: "center" }}>
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
      <List>
        {feed.map((post) => (
          <ListItem key={post.userId}>
            <ListItemAvatar>
              <Avatar src={post.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={userAction({ action: post.action, displayName: post.displayName, title: post.title })}
              secondary={formatTime(post.date).toX}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default NewsFeed;
