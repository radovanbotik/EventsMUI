import { Menu as MenuIcon } from "@mui/icons-material/";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/modalSlice";
import { logOut } from "../../store/authSlice";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  ButtonGroup,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Bar = ({ handleDrawerToggle, drawerWidth, auth, anchorEl, setAnchorEl }) => {
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useSelector(store => store.authReducer);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        {/* Menu Icon for MOBILE*/}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {/* AppTitle */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dashboard
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
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {currentUser?.photoURL ? (
                <Avatar alt="user name" src={currentUser?.photoURL} />
              ) : (
                <Avatar>{currentUser.email.charAt(0)}</Avatar>
              )}
            </IconButton>
            {/* Profile Menu Actions*/}
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
              <MenuItem onClick={handleClose} component={Link} to="account">
                My Account
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to={`profile/${currentUser.id}`}>
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

export default Bar;
