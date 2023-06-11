import { Box, Stack } from "@mui/material";
import { useState } from "react";
import EventChatForm from "../EventChatForm";
import useListenToEventComments from "../../../../hooks/useListenToEventComments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import EventChatReplyForm from "../EventChatReplyForm";
import HeadingH6 from "../../dashboard/common/headingH6";
import Comment from "./Comment";

const Chat = ({ id }) => {
  const [comments, setComments] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  console.log(replyingTo);

  useListenToEventComments({
    eventId: id,
    action: (data) => setComments(data),
    dependencies: [id],
  });

  const hashData = (data) => {
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
  console.log(replyingTo);
  return (
    <Stack direction="column" spacing={4}>
      <HeadingH6>Comments:</HeadingH6>
      {/* Reply */}
      {open && <EventChatForm id={id} />}
      <>
        {comments &&
          hashData(comments).map((comment) => (
            <Stack direction="column" spacing={4} key={comment.id}>
              <Comment comment={comment} setReplyingTo={setReplyingTo} />
              {replyingTo == comment.id && (
                <EventChatReplyForm
                  replyingTo={replyingTo}
                  commentId={comment.id}
                  eventId={id}
                  setReplyingTo={setReplyingTo}
                />
              )}
              <Box sx={{ pl: 10 }}>
                {comment.replies.length > 0 && (
                  <Stack direction="column" spacing={4}>
                    {comment.replies.map((reply) => (
                      <Stack key={reply.id}>
                        <Comment comment={reply} setReplyingTo={setReplyingTo} replyingTo={replyingTo} />
                        {replyingTo === reply.id && (
                          <EventChatReplyForm
                            replyingTo={replyingTo}
                            commentId={comment.id}
                            eventId={id}
                            setReplyingTo={setReplyingTo}
                          />
                        )}
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Box>
            </Stack>
          ))}
      </>
    </Stack>
  );
};

export default Chat;
