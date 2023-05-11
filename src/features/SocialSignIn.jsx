import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../store/authSlice";
import { closeModal } from "../store/modalSlice";

const SocialSignIn = () => {
  const dispatch = useDispatch();
  return (
    <ButtonGroup orientation="vertical" aria-label="vertical contained button group" variant="contained" fullWidth>
      <Button
        onClick={() => {
          dispatch(signInWithGoogle());
          dispatch(closeModal());
        }}
      >
        Google
      </Button>
    </ButtonGroup>
  );
};

export default SocialSignIn;
