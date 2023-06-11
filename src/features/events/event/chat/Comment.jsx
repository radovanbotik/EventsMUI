import { Avatar, Button, Stack, Typography } from "@mui/material";
import formatDate from "../../../../common/util/formatDate";
import EventChatReplyForm from "../EventChatReplyForm";

const Comment = ({ comment, setReplyingTo, replyingTo, id }) => {
  return (
    <Stack direction="row" spacing={4}>
      <Avatar sx={{ height: 60, width: 60 }} src={comment.photoURL} />
      <Stack direction="column" spacing={1} useFlexGap>
        <Typography gutterBottom variant="subtitle2">
          {comment.displayName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(comment.createdAt)}
        </Typography>
        <Typography variant="body2">{comment.comment || comment.reply}</Typography>
        <Button
          variant="text"
          size="small"
          disableElevation
          color="inherit"
          sx={{ pl: 0, justifyContent: "flex-start", textTransform: "capitalize", mb: 2 }}
          onClick={() => {
            replyingTo ? setReplyingTo(null) : setReplyingTo(comment.id);
          }}
        >
          Reply
        </Button>
        {replyingTo === comment.id && (
          <EventChatReplyForm
            replyingTo={replyingTo}
            commentId={comment.id}
            eventId={id}
            setReplyingTo={setReplyingTo}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default Comment;
