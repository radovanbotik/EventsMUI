import { useState } from "react";
import { AppBar, Toolbar, Container } from "@mui/material";
import DrawerToggleIcon from "./DrawerToggleIcon";
import Logo from "./Logo";
import Links from "./Links";
import UserAvatar from "./UserAvatar";
import UserArea from "./UserArea";
import SettingsToggleIcon from "./SettingsToggleIcon";

const Appbar = ({ handleDrawerToggle, routes, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const anchorMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar component="nav" color="inherit" elevation={0}>
      <Toolbar
        //Change to dense on scroll
        variant="regular"
        component={Container}
        maxWidth="lg"
        disableGutters
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Logo />
        <DrawerToggleIcon handleDrawerToggle={handleDrawerToggle} />
        <Links routes={routes} />
        <SettingsToggleIcon />
        <UserAvatar user={user} onClick={anchorMenu} />
        <UserArea handleClose={handleClose} anchorEl={anchorEl} user={user} />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
