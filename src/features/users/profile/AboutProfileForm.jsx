import { Stack, Button, IconButton, Tooltip, Toolbar } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import BasicInput from "../../../common/forms/BasicInput";
import { updateUser } from "../../../firestore/profileActions";
import ModalWrapper from "../../../common/modals/ModalWrapper";
import { DeleteForeverOutlined } from "@mui/icons-material";

const AboutProfileForm = ({ email, displayName, id, content }) => {
  const initialValues = {
    // displayName: displayName || email,
    description: content || "",
  };
  const validationSchema = Yup.object({
    // displayName: Yup.string("Please enter your name in correct format")
    //   .min(4, "Name must be at least 4 characters of length.")
    //   .required("This field is required."),
    description: Yup.string().required("This section won't be updated unless you provide information."),
  });
  return (
    <ModalWrapper title={"About you"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateUser({ updates: values });
        }}
      >
        {(formikProps) => (
          <Stack
            spacing={1}
            sx={{ px: 4 }}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              formikProps.handleSubmit(e);
            }}
          >
            {/* <BasicInput name="displayName" label="User Name" margin="dense" placeholder="My name is..." /> */}
            <BasicInput
              name="description"
              // label="About you"
              placeholder="Write about yourself..."
              margin="dense"
              multiline
              rows={10}
            />
            <Toolbar variant="dense" disableGutters>
              <Button
                type="submit"
                variant="contained"
                disabled={!formikProps.dirty}
                sx={{ borderRadius: "1rem", textTransform: "capitalize" }}
              >
                Submit
              </Button>
              <Tooltip title="Discard" placement="top">
                <IconButton onClick={formikProps.resetForm} sx={{ marginLeft: "auto" }}>
                  <DeleteForeverOutlined />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </Stack>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default AboutProfileForm;
