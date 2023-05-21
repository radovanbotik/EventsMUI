import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ListItemButton,
} from "@mui/material";
import { useState } from "react";
import EventChatForm from "./EventChatForm";
import useListenToEventComments from "../../../hooks/useListenToEventComments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Link } from "react-router-dom";
import defaultPhoto from "../../../common/images/defaultPhoto.jpg";
import EventChatReplyForm from "./EventChatReplyForm";

const EventChat = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  useListenToEventComments({ eventId: id, action: data => setComments(data), dependencies: [id] });
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography mr="auto">Comments</Typography>
          <Button variant="contained" size="small" onClick={() => setOpen(prev => !prev)}>
            {open ? "close" : "new comment"}
          </Button>
        </Toolbar>
      </AppBar>
      {open && <EventChatForm handleClose={handleClose} id={id} />}
      <>
        {comments &&
          comments.map(comment => (
            <List key={comment.id}>
              <ListItem divider disableGutters disablePadding>
                <ListItemAvatar>
                  <Avatar
                    src={comment.photoURL || defaultPhoto}
                    component={Link}
                    to={`/users/profile/${comment.userId}`}
                  />
                </ListItemAvatar>

                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="body2" component="span" mr={1}>
                      {comment.displayName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" component="span" color="text.secondary">
                      {dayjs(comment.createdAt).fromNow()}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptate corrupti, incidunt aliquam
                  officia animi, impedit reprehenderit nostrum omnis, eaque obcaecati perferendis eius dolore reiciendis
                  delectus harum necessitatibus unde. Velit error, aspernatur perspiciatis dolorum corrupti dolorem
                  commodi accusamus soluta at!
                </Typography>
              </ListItem>
              <ListItemButton
                dense
                onClick={() => setReplyingTo(comment.id)}
                sx={{ fontSize: "caption.fontSize", fontWeight: 700 }}
              >
                Reply
              </ListItemButton>

              {replyingTo === comment.id && (
                <ListItem>
                  <EventChatReplyForm
                    replyingTo={replyingTo}
                    commentId={comment.id}
                    eventId={id}
                    setReplyingTo={setReplyingTo}
                  />
                </ListItem>
              )}
            </List>
          ))}
      </>
    </>
  );
};

export default EventChat;
