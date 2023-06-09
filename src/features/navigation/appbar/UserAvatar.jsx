import { IconButton, Avatar } from "@mui/material";
import defaultPhoto from "../../../common/images/defaultPhoto.jpg";

const UserAvatar = ({ handleMenu, user }) => {
  return (
    <IconButton
      size="small"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
    >
      <Avatar alt="user name" src={user.photoURL || defaultPhoto} />
    </IconButton>
  );
};

export default UserAvatar;
