import { Formik } from "formik";
import * as Yup from "yup";
import { Stack } from "@mui/material";
import { addCommentToEvent } from "../../../../firestore/realtimeDatabase";
import ChatInput from "../../../../common/forms/ChatInput";

const validationSchema = Yup.object({
  comment: Yup.string().max(1000, "comment cannot exceed 1000 words."),
});
const initialValues = {
  comment: "",
};

const NewComment = ({ id }) => {
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
          <ChatInput
            name="comment"
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

export default NewComment;
