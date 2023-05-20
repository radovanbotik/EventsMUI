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
      <List>
        {comments &&
          comments.map(comment => (
            <div key={comment.id}>
              <ListItem dense divider disableGutters disablePadding>
                <ListItemAvatar>
                  <Avatar
                    src={comment.photoURL || defaultPhoto}
                    component={Link}
                    to={`/users/profile/${comment.userId}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography>
                      {comment.displayName}
                      <br /> {dayjs(comment.createdAt).fromNow()}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" whiteSpace="pre-wrap">
                        {comment.comment}
                      </Typography>
                    </>
                  }
                />
                <Button onClick={() => setReplyingTo(comment.id)}>Reply</Button>
              </ListItem>
              {replyingTo === comment.id && (
                <EventChatReplyForm
                  replyingTo={replyingTo}
                  commentId={comment.id}
                  eventId={id}
                  setReplyingTo={setReplyingTo}
                />
              )}
            </div>
          ))}
      </List>
    </>
  );
};

export default EventChat;
