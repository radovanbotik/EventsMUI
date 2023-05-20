import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import BasicInput from "../../../common/forms/BasicInput";
import { Typography, Stack, Button, ButtonGroup } from "@mui/material";
import { addReplyToEventMessage } from "../../../firestore/realtimeDatabase";

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
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {formikProps => (
        <>
          <Stack
            onSubmit={formikProps.handleSubmit}
            component="form"
            spacing={1}
            useFlexGap
            // onChange={e => console.log(e.target.name, e.target.value)}
          >
            <BasicInput
              name="reply"
              label="reply"
              margin="dense"
              placeholder="Enter your reply (Enter to submit, SHIFT + Enter for new line)"
              submitOnKeyDown={true}
              multiline
              minRows={2}
              maxRows={4}
            />
            <ButtonGroup fullWidth variant="contained">
              <Button
                color="warning"
                onClick={() => {
                  formikProps.handleReset();
                  setReplyingTo(null);
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">reply</Button>
            </ButtonGroup>
          </Stack>
        </>
      )}
    </Formik>
  );
};

export default EventChatReplyForm;
