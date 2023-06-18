import { Formik } from "formik";
import * as Yup from "yup";
import { Stack } from "@mui/material";
import { addReplyToEventMessage } from "../../../../firestore/realtimeDatabase";
import ChatInput from "../../../../common/forms/ChatInput";

const validationSchema = Yup.object({
  reply: Yup.string().max(1000, "reply cannot exceed 1000 words.").required("You forgot to write your reply."),
});
const initialValues = {
  reply: "",
};

const EventChatReplyForm = ({ setReplyingTo, eventId, commentId }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        try {
          await addReplyToEventMessage({
            reply: values,
            eventId: eventId,
            commentId: commentId,
          });
          setSubmitting(false);
          setReplyingTo(null);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formikProps) => (
        <Stack onSubmit={formikProps.handleSubmit} component="form" sx={{ flex: 1, pl: 0 }}>
          <ChatInput
            name="reply"
            // label="reply"
            size="small"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            placeholder="Write comment..."
            maxRows={"4"}
            multiline
            fullWidth
            submitOnKeyDown={true}
            sx={{ mt: 0 }}
          />
        </Stack>
      )}
    </Formik>
  );
};

export default EventChatReplyForm;
