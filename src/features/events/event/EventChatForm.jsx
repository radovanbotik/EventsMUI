import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import BasicInput from "../../../common/forms/BasicInput";
import { Typography, Stack, Button, ButtonGroup } from "@mui/material";
import { addCommentToEvent } from "../../../firestore/realtimeDatabase";

const validationSchema = Yup.object({
  comment: Yup.string().max(1000, "comment cannot exceed 1000 words.").required("You forgot to write your comment."),
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
        <Stack
          onSubmit={formikProps.handleSubmit}
          component="form"

          // onChange={e => console.log(e.target.name, e.target.value)}
        >
          {/* <Typography>New post:</Typography> */}
          <BasicInput
            name="comment"
            label="Comment"
            size="small"
            variant="filled"
            margin="dense"
            placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
            submitOnKeyDown={true}
            multiline
            fullWidth
            maxRows={"4"}
            sx={{ mt: 0 }}
          />
          <ButtonGroup sx={{ justifyContent: "flex-end" }}>
            <Button
              color="warning"
              onClick={() => {
                //   handleClose();
                formikProps.handleReset();
                handleClose();
              }}
              type="button"
              size="small"
              variant="text"
              sx={{ fontSize: "caption.fontSize" }}
            >
              Cancel
            </Button>
            <Button type="submit" size="small" variant="text" sx={{ fontSize: "caption.fontSize" }}>
              Post
            </Button>
          </ButtonGroup>
        </Stack>
      )}
    </Formik>
  );
};

export default EventChatForm;
