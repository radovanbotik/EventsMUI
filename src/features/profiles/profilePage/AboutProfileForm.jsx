import { Stack, Box, Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import BasicInput from "../../../common/forms/BasicInput";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/profileSlice";

const AboutProfileForm = ({ email, displayName, description }) => {
  const dispatch = useDispatch();

  const initialValues = {
    displayName: displayName || email,
    description: description || "",
  };
  const validationSchema = Yup.object({
    displayName: Yup.string("Please enter your name in correct format")
      .min(4, "Name must be at least 4 characters of length.")
      .required("This field is required."),
    description: Yup.string().max(
      1000,
      "Description cannot exceed 1000 characters."
    ),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        dispatch(updateUser(values));
      }}
    >
      {(formikProps) => (
        <Stack onSubmit={() => formikProps.handleSubmit()} component={Form}>
          <BasicInput
            name="displayName"
            label="User Name"
            margin="dense"
            placeholder="My name is..."
          />
          <BasicInput
            name="description"
            label="About me"
            placeholder="Write about yourself..."
            margin="dense"
            multiline
            rows={10}
            // maxRows={6}
          />
          <Stack direction="row" alignSelf="end">
            <Button type="button" onClick={formikProps.resetForm}>
              Reset
            </Button>
            <Button type="submit" disabled={!formikProps.dirty}>
              Submit
            </Button>
          </Stack>
        </Stack>
      )}
    </Formik>
  );
};

export default AboutProfileForm;
