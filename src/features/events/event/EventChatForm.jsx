import { Formik } from "formik";
import * as Yup from "yup";
import BasicInput from "../../../common/forms/BasicInput";
import { Stack, Button, ButtonGroup, InputAdornment, Avatar } from "@mui/material";
import { addCommentToEvent } from "../../../firestore/realtimeDatabase";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  comment: Yup.string().max(1000, "comment cannot exceed 1000 words.").required("You forgot to write your comment."),
});
const initialValues = {
  comment: "",
};

const EventChatForm = ({ handleClose, id }) => {
  const { currentUser } = useSelector((store) => store.authReducer);

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
            // label="Comment"
            size="small"
            variant="standard"
            margin="dense"
            placeholder="Enter to submit, SHIFT + Enter for new line"
            submitOnKeyDown={true}
            multiline
            fullWidth
            maxRows={"4"}
            sx={{ mt: 0 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Avatar sx={{ width: 24, height: 24 }} src={currentUser?.photoURL} />
                </InputAdornment>
              ),
            }}
          />
          <ButtonGroup sx={{ justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                formikProps.handleReset();
              }}
              type="button"
              size="small"
              variant="text"
              sx={{ fontSize: "caption.fontSize", p: 0, textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="small"
              variant="text"
              sx={{ fontSize: "caption.fontSize", p: 0, textTransform: "none" }}
            >
              Post
            </Button>
          </ButtonGroup>
        </Stack>
      )}
    </Formik>
  );
};

export default EventChatForm;
