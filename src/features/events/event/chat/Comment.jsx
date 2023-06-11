import { Avatar, Button, Stack, Typography } from "@mui/material";
import formatDate from "../../../../common/util/formatDate";

const Comment = ({ comment, setReplyingTo, replyingTo }) => {
  console.log(replyingTo);
  return (
    <Stack direction="row" spacing={4}>
      <Avatar sx={{ height: 60, width: 60 }} src={comment.photoURL} />
      <Stack direction="column" spacing={1}>
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
          sx={{ pl: 0, justifyContent: "flex-start", textTransform: "capitalize" }}
          onClick={() => {
            setReplyingTo(comment.id);
          }}
        >
          Reply
        </Button>
      </Stack>
    </Stack>
  );
};

export default Comment;
