import { useState } from "react";
import { AppBar, Toolbar, Container, Button } from "@mui/material";
import DrawerToggleIcon from "./DrawerToggleIcon";
import Logo from "./Logo";
import Links from "./Links";
import UserAvatar from "./UserAvatar";
import UserArea from "./UserArea";
import SettingsToggleIcon from "./SettingsToggleIcon";
import { grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";

const Appbar = ({ handleDrawerToggle, routes, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
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
        <Button
          size="small"
          sx={{
            order: 4,
            backgroundColor: grey[900],
            color: "white",
            cursor: "pointer",
            fontSize: "body2.fontSize",
            textTransform: "capitalize",
            ml: 2,
            "&:hover": {
              color: "text.primary",
            },
          }}
          onClick={() => dispatch(openModal({ modalType: "event" }))}
        >
          add event
        </Button>
        <Links routes={routes} />
        <DrawerToggleIcon handleDrawerToggle={handleDrawerToggle} />
        <SettingsToggleIcon />
        <UserAvatar user={user} onClick={anchorMenu} />
        <UserArea handleClose={handleClose} anchorEl={anchorEl} user={user} />
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
