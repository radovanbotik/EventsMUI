import { useState } from "react";
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, styled, Avatar } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { signUserOut } from "../../firestore/userActions";
import { openModal } from "../../store/modalSlice";
import { useNavigate, useLocation } from "react-router-dom";
import defaultPhoto from "../../common/images/defaultPhoto.jpg";
import { drawerWidth } from "../../app/layout/Persistent";
import BasicMenu from "../../common/menus/BasicMenu";
import BasicButton from "../../common/buttons/BasicButton";
import useGetPathName from "../../hooks/useGetPathName";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
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
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, isAuthenticated } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pathName, setPathName] = useState(null);

  //Anchor Menu to element
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //Close Menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  //Menu actions
  const menuActions = [
    {
      id: "a1",
      actionName: "Account",
      location: "/account",
      action() {
        navigate(this.location);
        setAnchorEl(null);
      },
    },
    {
      id: "a2",
      actionName: "Profile",
      location: `/users/profile/${currentUser?.id}`,
      action() {
        navigate(this.location);
        setAnchorEl(null);
      },
    },
    {
      id: "a3",
      actionName: "Sign Out",
      location: `/events`,
      action() {
        navigate(this.location);
        signUserOut();
        setAnchorEl(null);
      },
    },
  ];
  //Open Modal

  const location = useLocation();
  useGetPathName({
    action: (pathname) => setPathName(pathname),
    dependecies: [location],
  });

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{ position: "relative", display: "flex" }}>
        {/* Resize icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuOutlined />
        </IconButton>
        {/* Logo */}
        <Typography variant="h6" noWrap component="div" sx={{ mr: "auto", textTransform: "capitalize" }}>
          {pathName}
        </Typography>
        {/* Auth actions */}
        {!isAuthenticated && (
          <>
            <BasicButton variant="contained" action={() => dispatch(openModal({ modalType: "register" }))}>
              Register
            </BasicButton>
            <BasicButton variant="contained" action={() => dispatch(openModal({ modalType: "login" }))}>
              Log In
            </BasicButton>
          </>
        )}
        {/* Account Circle */}
        {isAuthenticated && (
          <>
            {/* Profile Picture */}
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <Avatar alt="user name" src={currentUser.photoURL ? currentUser.photoURL : defaultPhoto} />
            </IconButton>
            <BasicMenu handleClose={handleClose} anchorEl={anchorEl} menuActions={menuActions} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
