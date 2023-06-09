import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import { Formik } from "formik";
import BasicInput from "../../../common/forms/BasicInput";
import { signUserIn } from "../../../firestore/userActions";
import { Button, Link, Stack } from "@mui/material";
import PasswordInput from "../../../common/forms/PasswordInput";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  return (
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
        signUserIn({ email: values.email, password: values.password, action: () => navigate("/events") });
      }}
    >
      {(formikProps) => (
        <Stack
          sx={{ flex: 1, placeContent: "center" }}
          spacing={3}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            formikProps.handleSubmit();
          }}
        >
          <Stack spacing={3}>
            <BasicInput
              name="email"
              label="Email"
              type="email"
              sx={{ border: "none", "& fieldset": { border: "none" } }}
            />
            <PasswordInput
              name="password"
              label="Password"
              type="password"
              sx={{ border: "none", "& fieldset": { border: "none" } }}
            />
            <Link underline="always" color="text.secondary" alignSelf="end" variant="body2">
              Forgot password?
            </Link>
          </Stack>
          <Button
            type="submit"
            size="large"
            variant="contained"
            disableElevation
            fullWidth
            sx={{ textTransform: "capitalize", backgroundColor: grey[900], "&:hover": { backgroundColor: grey[800] } }}
          >
            Login
          </Button>
        </Stack>
      )}
    </Formik>
  );
};

export default RegisterForm;
