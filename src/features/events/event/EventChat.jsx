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
  const [open, setOpen] = useState(true);
  const [comments, setComments] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  useListenToEventComments({ eventId: id, action: data => setComments(data), dependencies: [id] });

  const hashData = data => {
    // console.log(data);
    const hashtable = {};
    data.forEach(entry => (hashtable[entry.id] = { ...entry, replies: [] }));
    let dataTree = [];
    data.forEach(entry => {
      if (entry.commentId) hashtable[entry.commentId].replies.push(hashtable[entry.id]);
      else dataTree.push(hashtable[entry.id]);
    });
    console.log(dataTree);
    return dataTree;
  };
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
          hashData(comments).map(comment => (
            <List key={comment.id}>
              <ListItem disableGutters disablePadding>
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
                    <>
                      <Typography variant="body2" component="span" mr={1}>
                        {comment.displayName}
                      </Typography>
                      <Typography variant="body2" component="span" color="text.secondary">
                        {dayjs(comment.createdAt).fromNow()}
                      </Typography>
                    </>
                  }
                  secondary={
                    <ListItemText>
                      <Typography variant="body2">{comment.comment}</Typography>
                    </ListItemText>
                  }
                />
              </ListItem>
              <ListItem disableGutters disablePadding>
                <ListItemText inset>
                  <ListItemButton
                    dense
                    onClick={() => setReplyingTo(comment.id)}
                    sx={{ fontSize: "caption.fontSize", fontWeight: 700, p: 0 }}
                  >
                    Reply
                  </ListItemButton>
                </ListItemText>
              </ListItem>
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
              <Box sx={{ pl: 4 }}>
                {comment.replies.length > 0 && (
                  <Box>
                    {comment.replies.map(reply => (
                      <List key={reply.id}>
                        <ListItem disableGutters disablePadding>
                          <ListItemAvatar>
                            <Avatar
                              src={reply.photoURL || defaultPhoto}
                              component={Link}
                              to={`/users/profile/${reply.userId}`}
                              sx={{ width: 24, height: 24 }}
                            />
                          </ListItemAvatar>

                          <ListItemText
                            disableTypography
                            primary={
                              <Typography variant="body2" component="span" mr={1}>
                                {reply.displayName}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" component="span" color="text.secondary">
                                {dayjs(reply.createdAt).fromNow()}
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem disableGutters disablePadding>
                          <ListItemText inset>
                            <Typography variant="body2">{reply.comment || reply.reply}</Typography>
                          </ListItemText>
                        </ListItem>
                        <ListItem disableGutters disablePadding>
                          <ListItemText inset>
                            <ListItemButton
                              dense
                              onClick={() => setReplyingTo(reply.id)}
                              sx={{ fontSize: "caption.fontSize", fontWeight: 700, p: 0 }}
                            >
                              Reply
                            </ListItemButton>
                          </ListItemText>
                        </ListItem>
                        {replyingTo === reply.id && (
                          <ListItem>
                            <EventChatReplyForm
                              replyingTo={replyingTo}
                              //Swapper comment.id for reply.id  maybe implement recursion?
                              commentId={comment.id}
                              eventId={id}
                              setReplyingTo={setReplyingTo}
                            />
                          </ListItem>
                        )}
                      </List>
                    ))}
                  </Box>
                )}
              </Box>
            </List>
          ))}
      </>
    </>
  );
};

export default EventChat;
