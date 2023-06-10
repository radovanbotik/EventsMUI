import { Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUserOut } from "../../../firestore/userActions";

const UserArea = ({ handleClose, anchorEl, user }) => {
  const navigate = useNavigate();

  return (
    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem
        onClick={() => {
          navigate("/account");
          handleClose();
        }}
      >
        <Typography>Account</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate(`/users/profile/${user.id}`);
          handleClose();
        }}
      >
        <Typography>Profile</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/");
          signUserOut();
          handleClose();
        }}
      >
        <Typography>Sign Out</Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserArea;
