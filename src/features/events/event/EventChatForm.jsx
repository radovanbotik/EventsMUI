import { Formik } from "formik";
import * as Yup from "yup";
import BasicInput from "../../../common/forms/BasicInput";
import { Stack } from "@mui/material";
import { addCommentToEvent } from "../../../firestore/realtimeDatabase";

const validationSchema = Yup.object({
  comment: Yup.string().max(1000, "comment cannot exceed 1000 words.").required("You forgot to write your comment."),
});
const initialValues = {
  comment: "",
};

const EventChatForm = ({ id }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        try {
          await addCommentToEvent({ post: values, id: id });
          setSubmitting(false);
          resetForm();
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formikProps) => (
        <Stack onSubmit={formikProps.handleSubmit} component="form">
          <BasicInput
            name="comment"
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

export default EventChatForm;
