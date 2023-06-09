import ModalWrapper from "../../common/modals/ModalWrapper";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import { Formik } from "formik";
import BasicInput from "../../common/forms/BasicInput";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { Paper, Button, ButtonGroup, Divider, Stack, Box, Chip, Typography } from "@mui/material";
import SignInWithGoogle from "./SignInWithGoogle";
import { signUpNewUser } from "../../firestore/userActions";
import Join from "../../common/svg/Join";

const RegisterForm = () => {
  const dispatch = useDispatch();

  return (
    <ModalWrapper title={"Register your account"}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} p={2}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Please enter a valid email").required("This field is required."),
            password: Yup.string().password().required("This field is requried."),
          })}
          onSubmit={(values) => {
            signUpNewUser({ email: values.email, password: values.password });
            dispatch(closeModal());
          }}
        >
          {(formikProps) => (
            <Stack
              sx={{ flex: 1, placeContent: "center" }}
              spacing={2}
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                formikProps.handleSubmit();
              }}
            >
              <Stack>
                <BasicInput name="email" label="Email" variant="standard" type="email" />
                <BasicInput name="password" label="Password" variant="standard" type="password" />
              </Stack>
              <Button type="submit" variant="contained">
                Register
              </Button>
              <Divider>
                <Chip label="Sign in using Google" />
              </Divider>
              <SignInWithGoogle />
            </Stack>
          )}
        </Formik>
        <Box sx={{ flex: 1 }}>
          <Join />
        </Box>
      </Stack>
    </ModalWrapper>
  );
};

export default RegisterForm;
