import { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { drawerWidth } from "../../../app/layout/Layout";
import AvatarMenu from "./AvatarMenu";
import RouteName from "./RouteName";
import UserAvatar from "./UserAvatar";
import OpenSidebarIcon from "./OpenSidebarIcon";

const Appbar = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, isAuthenticated } = useSelector((store) => store.authReducer);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <OpenSidebarIcon handleDrawerToggle={handleDrawerToggle} />
        <RouteName />
        {isAuthenticated && <UserAvatar user={currentUser} handleMenu={handleMenu} />}
        {isAuthenticated && <AvatarMenu handleClose={handleClose} anchorEl={anchorEl} user={currentUser} />}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
