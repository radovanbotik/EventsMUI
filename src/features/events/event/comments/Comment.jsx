import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import formatDate from "../../../../common/util/formatDate";
import NewReply from "./NewReply";

const Comment = ({ comment, setReplyingTo, replyingTo, id }) => {
  return (
    <Stack direction="row" spacing={4}>
      <Avatar sx={{ height: 60, width: 60 }} src={comment.photoURL} />
      <Stack direction="column" spacing={1} useFlexGap sx={{ flex: 1 }}>
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
          color="inherit"
          disableElevation
          disableRipple
          sx={{
            pl: 0,
            justifyContent: "flex-start",
            textTransform: "capitalize",
            mb: 2,
            width: "fit-content",
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={() => {
            replyingTo ? setReplyingTo(null) : setReplyingTo(comment.id);
          }}
        >
          Reply
        </Button>
        {replyingTo === comment.id && (
          <NewReply replyingTo={replyingTo} commentId={comment.id} eventId={id} setReplyingTo={setReplyingTo} />
        )}
        <Divider light flexItem sx={{ width: "100%" }} />
      </Stack>
    </Stack>
  );
};

export default Comment;
