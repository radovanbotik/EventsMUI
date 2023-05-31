import { useState } from "react";
import { Grid, Avatar, Typography, Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import useIsFollowingThisUser from "../../../hooks/useIsFollowingThisUser";
import { addFollow, removeFollow } from "../../../firestore/profileActions";

const ProfileHeader = ({ photoURL, displayName, email, owner, id, following, followers }) => {
  const { currentUser } = useSelector((store) => store.authReducer);
  const [followsUser, setFollowsUser] = useState(null);

  const toggleFollowing = () => {
    if (followsUser) {
      removeFollow({
        userToUnfollow: {
          id: id,
          displayName: displayName,
        },
        loggedUser: currentUser,
      });
    } else {
      addFollow({
        userToFollow: {
          id: id,
          displayName: displayName,
          email: email,
          photoURL: photoURL || null,
        },
        loggedUser: currentUser,
      });
    }
  };

  useIsFollowingThisUser({
    userId: id,
    action: (bool) => setFollowsUser(bool),
    dependancies: [id],
  });

  return (
    <Grid
      component="div"
      container
      mb={4}
      sx={{
        py: 4,
        display: "flex",
        alignItems: "center",
        width: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        "& hr": {
          mx: 8,
        },
        // width: "fit-content",
      }}
    >
      <Grid item xs={12} lg={2} sx={{ display: "grid", placeContent: "center" }}>
        <Avatar sx={{ width: 100, height: 100 }} src={photoURL}></Avatar>
      </Grid>
      <Grid item xs={12} lg={5} sx={{ display: "grid", placeContent: "center" }}>
        <Typography variant="h4">{displayName || email}</Typography>
      </Grid>
      <Grid item xs={12} lg={5} textAlign="center" sx={{ display: "grid", placeContent: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack>
              <Typography variant="h4">{followers ? followers : 0}</Typography>
              <Typography>Followers</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <Typography variant="h4">{following ? following : 0}</Typography>
              <Typography>following</Typography>
            </Stack>
          </Grid>
        </Grid>
        {!owner && (
          <Button variant="contained" onClick={toggleFollowing}>
            {followsUser ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
