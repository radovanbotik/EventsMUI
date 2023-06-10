import { IconButton, Avatar } from "@mui/material";
import defaultPhoto from "../../../common/images/defaultPhoto.jpg";

const UserAvatar = ({ handleMenu, user, onClick }) => {
  return (
    <IconButton
      size="small"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={onClick}
    >
      <Avatar alt="user name" src={user?.photoURL || defaultPhoto} sx={{ height: 32, width: 32 }} />
    </IconButton>
  );
};

export default UserAvatar;
