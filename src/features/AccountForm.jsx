import React from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import { Formik } from "formik";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

const validationSchema = Yup.object({
  password: Yup.string().password().required("This field is required."),
  "password confirmation": Yup.string()
    .password()
    .oneOf([Yup.ref("password"), null], "Passwords do not match!")
    .required("This field is required."),
});
const initialValues = {
  password: "",
  "password confirmation": "",
};

const AccountForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async values => {
        console.log(values);
      }}
    >
      {formikProps => (
        <Box component={"form"} onSubmit={formikProps.handleSubmit}>
          <Stack>
            <Typography>Change your password</Typography>
            <PasswordInput name="password" label="New password" type="password" placeholder="enter new password" />
            <PasswordInput
              name="password confirmation"
              label="Password confirmation"
              type="password"
              placeholder="confirm new password"
            />
            <ButtonGroup fullWidth>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  formikProps.resetForm();
                }}
              >
                cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!formikProps.dirty}
                color={formikProps.dirty && !formikProps.isValid ? "error" : "primary"}
              >
                submit
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default AccountForm;
