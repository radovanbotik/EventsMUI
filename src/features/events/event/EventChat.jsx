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
  ListItemButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import EventChatForm from "./EventChatForm";
import { listenToEventChat } from "../../../firestore/realtimeDatabase";
import useListenToEventComments from "../../../hooks/useListenToEventComments";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const EventChat = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(null);
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
            <ListItem key={comment[0]} dense divider disableGutters disablePadding>
              <ListItemAvatar>
                <Avatar src={comment[1].photoURL || null} component={Link} to={`/users/profile/${comment[1].id}`} />
              </ListItemAvatar>
              <ListItemText
                primary={comment[1].displayName}
                secondary={
                  <>
                    <Typography component="span">
                      {comment[1].comment} <br /> {dayjs(comment[1].createdAt).format("DD/MM/YYYY")}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default EventChat;
