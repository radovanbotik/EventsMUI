import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  AppBar,
  Toolbar,
  Typography,
  Box,
  ListItemButton,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";
import EventChatForm from "../EventChatForm";
import useListenToEventComments from "../../../../hooks/useListenToEventComments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Link } from "react-router-dom";
import defaultPhoto from "../../../../common/images/defaultPhoto.jpg";
import EventChatReplyForm from "../EventChatReplyForm";
import HeadingH6 from "../../dashboard/common/headingH6";
import Comment from "./Comment";

const Chat = ({ id }) => {
  const [open, setOpen] = useState(true);
  const [comments, setComments] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  useListenToEventComments({
    eventId: id,
    action: (data) => setComments(data),
    dependencies: [id],
  });

  const hashData = (data) => {
    // console.log(data);
    const hashtable = {};
    data.forEach((entry) => (hashtable[entry.id] = { ...entry, replies: [] }));
    let dataTree = [];
    data.forEach((entry) => {
      if (entry.commentId) hashtable[entry.commentId].replies.push(hashtable[entry.id]);
      else dataTree.push(hashtable[entry.id]);
    });
    // console.log(dataTree);
    return dataTree;
  };
  return (
    <Stack direction="column" spacing={4}>
      <HeadingH6>Comments:</HeadingH6>
      {/* Reply */}
      {open && <EventChatForm handleClose={handleClose} id={id} />}
      <>
        {comments &&
          hashData(comments).map((comment) => (
            <Stack key={comment.id} spacing={4}>
              <Comment setReplyingTo={setReplyingTo} replyingTo={replyingTo} comment={comment} id={id} />
              <Stack spacing={4} sx={{ pl: 10 }}>
                {comment.replies.length > 0 &&
                  comment.replies.map((reply) => (
                    <Comment
                      setReplyingTo={setReplyingTo}
                      replyingTo={replyingTo}
                      comment={reply}
                      id={id}
                      key={reply.id}
                    />
                  ))}
              </Stack>
            </Stack>
          ))}
      </>
    </Stack>
  );
};

export default Chat;
