import DialogWrap from "./DialogWrap";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup
import { Formik } from "formik";

import { Form } from "react-router-dom";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";
import { logIn } from "../store/authSlice";

import { Paper, Button, ButtonGroup } from "@mui/material";
import { toast } from "react-toastify";

const FormModal = () => {
  const dispatch = useDispatch();
  return (
    <DialogWrap title={"Sign in to your account"}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Please enter a valid email").required("This field is required."),
          password: Yup.string().password().required("This field is requried."),
        })}
        onSubmit={values => {
          // const user = {
          //   ...values,
          //   photoURL:
          //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU5XItnpm5LbvsoblhdfuXF7SHwlOLPeUIkw&usqp=CAU",
          // };
          console.log(values);
          // dispatch(signIn(user));
          dispatch(logIn(values))
            .then(() => toast.success("you have logged in!"))
            .catch(() => toast.error("there was an error!"));
          dispatch(closeModal());
        }}
      >
        {formikProps => (
          <Paper
            sx={{ display: "flex", flexDirection: "column", p: 2 }}
            component={Form}
            onSubmit={() => formikProps.handleSubmit()}
          >
            <Input margin="dense" name="email" label="Email" placeholder="poopypants@gmail.com" type="email" />
            <Input margin="dense" name="password" label="Password" placeholder="StinkyPoop123!" type="password" />
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
          </Paper>
        )}
      </Formik>
    </DialogWrap>
  );
};

export default FormModal;
