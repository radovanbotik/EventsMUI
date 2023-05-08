/* eslint-disable react/prop-types */

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../store/modalSlice";
import { signOut } from "../store/authSlice";

const Bar = ({ handleDrawerToggle, drawerWidth, auth, anchorEl, setAnchorEl }) => {
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const { currentUser, isAuthenticated } = useSelector(store => store.authReducer);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        {/* Menu Icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {/* AppTitle */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Event Organizer Or Something
        </Typography>
        {!isAuthenticated && (
          <Button
            variant="contained"
            sx={{ bgcolor: "primary.light" }}
            onClick={() => dispatch(openModal({ modalType: "login" }))}
          >
            sign in
          </Button>
        )}
        {/* Profile Menu */}
        {isAuthenticated && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {currentUser.photoURL ? (
                <Avatar alt="user name" src={currentUser.photoURL} />
              ) : (
                <Avatar>{currentUser.email.charAt(0)}</Avatar>
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>

              <MenuItem
                onClick={() => {
                  dispatch(signOut());
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Bar;
