import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import BasicInput from "../../../common/forms/BasicInput";
import { Typography, Stack, Button, ButtonGroup } from "@mui/material";
import { addCommentToEvent } from "../../../firestore/realtimeDatabase";

const validationSchema = Yup.object({
  comment: Yup.string()
    .min(5, "comment must contain at least 5 characters")
    .max(1000, "comment cannot exceed 1000 words.")
    .required("You forgot to write your comment."),
});
const initialValues = {
  comment: "",
};

const EventChatForm = ({ handleClose, id }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        try {
          await addCommentToEvent({ post: values, id: id });
          setSubmitting(false);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {formikProps => (
        <>
          <Typography>New post:</Typography>
          <Stack
            onSubmit={formikProps.handleSubmit}
            component="form"
            spacing={1}
            useFlexGap
            // onChange={e => console.log(e.target.name, e.target.value)}
          >
            <BasicInput
              name="comment"
              label="Comment"
              margin="dense"
              submitOnKeyDown={true}
              multiline
              minRows={1}
              maxRows={4}
            />
            <ButtonGroup fullWidth variant="contained">
              <Button
                color="warning"
                onClick={() => {
                  //   handleClose();
                  formikProps.handleReset();
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Post</Button>
            </ButtonGroup>
          </Stack>
        </>
      )}
    </Formik>
  );
};

export default EventChatForm;
