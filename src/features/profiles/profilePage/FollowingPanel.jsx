import React from "react";
import { Box, AppBar, Toolbar, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import defaultPhoto from "../../../common/images/defaultPhoto.jpg";
import useSubscribeToSubcollection from "../../../hooks/useSubscribeToSubcollection";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "../../../store/profileSlice";

const FollowingPanel = ({ props }) => {
  const dispatch = useDispatch();
  const { id } = props;
  const { following, status } = useSelector((store) => store.profileReducer);

  useSubscribeToSubcollection({
    parentCollection: "following",
    parentDocument: id,
    subCollection: "following",
    action: (following) => dispatch(setFollowing(following)),
  });

  if (status === "loading") {
    return <div>loading....</div>;
  }

  return (
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <AccountCircle sx={{ mr: 2 }} />
          <Typography sx={{ mr: "auto" }}>Following</Typography>
        </Toolbar>
      </AppBar>
      <List>
        {following.length === 0 && <Typography>User is not following anyone.</Typography>}
        {following?.map((person) => {
          return (
            <ListItem alignItems="flex-start" key={person.id} component={Link} to={`/users/profile/${person.id}`}>
              <ListItemAvatar>
                <Avatar src={person.photoURL || defaultPhoto} />
              </ListItemAvatar>
              <ListItemText primary={person.displayName} secondary={person.email} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default FollowingPanel;
