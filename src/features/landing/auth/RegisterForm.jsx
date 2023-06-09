import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import { Formik } from "formik";
import BasicInput from "../../../common/forms/BasicInput";
import { useDispatch } from "react-redux";
import { signUserIn } from "../../../firestore/userActions";
import { Button, Stack, Typography } from "@mui/material";
import PasswordInput from "../../../common/forms/PasswordInput";
import { grey } from "@mui/material/colors";
import Popover from "./Popover";

const tos =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti numquam excepturi itaque officiis facere ullam, temporibus quia autem repellendus ipsam voluptates vero, maiores, nam corporis modi. Accusantium unde architecto natus, veritatis atque ipsum, minus possimus qui sequi obcaecati sed ab dignissimos error. Qui voluptas dolor dolores est amet quia nostrum.";

const privacyPolicy =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti numquam excepturi itaque officiis facere ullam, temporibus quia autem repellendus ipsam voluptates vero, maiores, nam corporis modi. Accusantium unde architecto natus, veritatis atque ipsum, minus possimus qui sequi obcaecati sed ab dignissimos error. Qui voluptas dolor dolores est amet quia nostrum.";

const RegisterForm = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        password2: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Please enter a valid email").required("This field is required."),
        password: Yup.string().password().required("This field is requried."),
        password2: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match."),
      })}
      onSubmit={(values) => {
        signUserIn({ email: values.email, password: values.password });
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
            <PasswordInput
              name="password2"
              label="Confirm Password"
              type="password"
              sx={{ border: "none", "& fieldset": { border: "none" } }}
            />
          </Stack>
          <Button
            type="submit"
            size="large"
            variant="contained"
            disableElevation
            fullWidth
            sx={{ textTransform: "capitalize", backgroundColor: grey[900], "&:hover": { backgroundColor: grey[800] } }}
          >
            Register
          </Button>
          <Typography variant="caption" textAlign="center">
            I agree to <Popover content={tos}>Terms of Service</Popover> and{" "}
            <Popover content={privacyPolicy}>Privacy Policy.</Popover>
          </Typography>
        </Stack>
      )}
    </Formik>
  );
};

export default RegisterForm;
