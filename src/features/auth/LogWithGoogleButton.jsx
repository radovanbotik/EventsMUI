import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../../store/authSlice";
import { closeModal } from "../../store/modalSlice";

const LogWithGoogleButton = () => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      onClick={() => {
        dispatch(signInWithGoogle());
        dispatch(closeModal());
      }}
    >
      Google
    </Button>
  );
};

export default LogWithGoogleButton;
