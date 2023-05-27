import ModalWrapper from "../../common/modals/ModalWrapper";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import { Formik } from "formik";

import { Form } from "react-router-dom";
import BasicInput from "../../common/forms/BasicInput";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { logIn } from "../../store/authSlice";

import { Paper, Button, ButtonGroup, Divider } from "@mui/material";
import SocialSignIn from "./LogWithGoogleButton";

const LoginForm = () => {
  const dispatch = useDispatch();
  return (
    <ModalWrapper title={"Sign in to your account"}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Please enter a valid email")
            .required("This field is required."),
          password: Yup.string().password().required("This field is requried."),
        })}
        onSubmit={(values) => {
          console.log(values);
          dispatch(logIn(values));
          dispatch(closeModal());
        }}
      >
        {(formikProps) => (
          <Paper
            sx={{ display: "flex", flexDirection: "column", p: 2 }}
            component={Form}
            onSubmit={() => formikProps.handleSubmit()}
          >
            <BasicInput
              margin="dense"
              name="email"
              label="Email"
              placeholder="poopypants@gmail.com"
              type="email"
            />
            <BasicInput
              margin="dense"
              name="password"
              label="Password"
              placeholder="StinkyPoop123!"
              type="password"
            />
            <ButtonGroup fullWidth sx={{ mt: 2 }}>
              <Button
                type="button"
                onClick={() => {
                  dispatch(closeModal());
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                //    disabled={!formikProps.dirty || !formikProps.isValid}
                variant="contained"
                // sx={{ bgcolor: !formikProps.dirty || !formikProps.isValid ? "error.light" : "primary.main" }}
              >
                Submit
              </Button>
            </ButtonGroup>
            <Divider sx={{ my: 4 }} />
            <SocialSignIn />
          </Paper>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;
