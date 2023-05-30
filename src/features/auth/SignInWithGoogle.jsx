import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/modalSlice";
import { signUserWithGoogle } from "../../firestore/userActions";

const SignInWithGoogle = () => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      type="button"
      onClick={() => {
        signUserWithGoogle();
        dispatch(closeModal());
      }}
    >
      Google
    </Button>
  );
};

export default SignInWithGoogle;
