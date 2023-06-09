import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";

const AuthButtons = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Button variant="contained" action={() => dispatch(openModal({ modalType: "register" }))}>
        Register
      </Button>
      <Button variant="contained" action={() => dispatch(openModal({ modalType: "login" }))}>
        Log In
      </Button>
    </>
  );
};

export default AuthButtons;
