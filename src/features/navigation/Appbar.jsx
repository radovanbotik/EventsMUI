import React, { useState } from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  styled,
  useTheme,
  Box,
  MenuItem,
  Menu,
  Avatar,
  ButtonGroup,
  Button,
} from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
//auth
import { logOut } from "../../store/authSlice";
import { openModal } from "../../store/modalSlice";
// react router dom
import { Link, useNavigate } from "react-router-dom";
import defaultPhoto from "../../common/images/defaultPhoto.jpg";
import { drawerWidth } from "../../app/layout/Persistent";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Appbar = ({ handleDrawerOpen, open }) => {
  console.log(open);
  //signup login
  const { currentUser, isAuthenticated } = useSelector(store => store.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //menu
  const handleMenu = event => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{ position: "relative", display: "flex" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ mr: "auto" }}>
          Events
        </Typography>
        {/* Sign in / Register Button */}
        {!isAuthenticated && (
          <ButtonGroup>
            <Button
              variant="contained"
              sx={{ bgcolor: "primary.light" }}
              onClick={() => dispatch(openModal({ modalType: "register" }))}
            >
              register
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "primary.light" }}
              onClick={() => dispatch(openModal({ modalType: "login" }))}
            >
              sign in
            </Button>
          </ButtonGroup>
        )}
        {/* Profile Menu */}
        {isAuthenticated && (
          <Box>
            {/* Profile Picture */}
            <Box sx={{ position: "relative" }}>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="user name" src={currentUser.photoURL ? currentUser.photoURL : defaultPhoto} />
              </IconButton>
            </Box>
            {/* Profile Menu Actions*/}
            <Menu
              anchorEl={anchorEl}
              //   anchorOrigin={{
              //     vertical: "top",
              //     horizontal: "right",
              //   }}
              keepMounted
              //   transformOrigin={{
              //     vertical: "top",
              //     horizontal: "right",
              //   }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/account">
                My Account
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to={`/users/profile/${currentUser.id}`}>
                My Profile
              </MenuItem>

              <MenuItem
                onClick={() => {
                  dispatch(logOut());
                  handleClose();
                  navigate("/events");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
