import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import BasicInput from "../../../common/forms/BasicInput";
import { Typography, Stack, Button, ButtonGroup, ListItem } from "@mui/material";
import { addReplyToEventMessage } from "../../../firestore/realtimeDatabase";
import { Box } from "@mui/system";

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
          await addReplyToEventMessage({ reply: values, eventId: eventId, commentId: commentId });
          setSubmitting(false);
          setReplyingTo(null);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {formikProps => (
        <Stack onSubmit={formikProps.handleSubmit} component="form" sx={{ flex: 1, pl: 4 }}>
          <BasicInput
            name="reply"
            label="reply"
            size="small"
            variant="filled"
            margin="dense"
            placeholder="Enter your reply (Enter to submit, SHIFT + Enter for new line)"
            maxRows={"4"}
            multiline
            fullWidth
            submitOnKeyDown={true}
            sx={{ mt: 0 }}
          />
          <ButtonGroup sx={{ justifyContent: "flex-end" }}>
            <Button
              color="warning"
              onClick={() => {
                formikProps.handleReset();
                setReplyingTo(null);
              }}
              type="button"
              size="small"
              variant="text"
              sx={{ fontSize: "caption.fontSize" }}
            >
              Cancel
            </Button>
            <Button type="submit" size="small" variant="text" sx={{ fontSize: "caption.fontSize" }}>
              reply
            </Button>
          </ButtonGroup>
        </Stack>
      )}
    </Formik>
  );
};

export default EventChatReplyForm;
