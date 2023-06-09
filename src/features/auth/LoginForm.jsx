import ModalWrapper from "../../common/modals/ModalWrapper";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import { Formik } from "formik";
import BasicInput from "../../common/forms/BasicInput";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { signUserIn } from "../../firestore/userActions";
import { Box, Button, Divider, Chip } from "@mui/material";
import SignInWithGoogle from "./SignInWithGoogle";
import { Stack } from "@mui/system";
import SignIn from "../../common/svg/SignIn";

const LoginForm = () => {
  const dispatch = useDispatch();
  return (
    <ModalWrapper title={"Sign in to your account"}>
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
            signUserIn({ email: values.email, password: values.password });
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
                <BasicInput
                  name="email"
                  label="Email"
                  // placeholder="poopypants@gmail.com"
                  type="email"
                  variant="standard"
                />
                <BasicInput
                  name="password"
                  label="Password"
                  // placeholder=""
                  type="password"
                  variant="standard"
                />
              </Stack>
              <Button type="submit" size="large" variant="contained" sx={{ textTransform: "capitalize" }}>
                Sign In
              </Button>
              <Divider>
                <Chip label="Sign in using Google" />
              </Divider>
              <SignInWithGoogle />
            </Stack>
          )}
        </Formik>
        <Box sx={{ flex: 1 }}>
          <SignIn />
        </Box>
      </Stack>
    </ModalWrapper>
  );
};

export default LoginForm;
