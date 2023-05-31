import { AppBar, Toolbar, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import defaultPhoto from "../../../common/images/defaultPhoto.jpg";
import { setFollowers } from "../../../store/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import useSubscribeToFollowers from "../../../hooks/useSubscribeToFollowers";

const FollowersPanel = ({ id }) => {
  const dispatch = useDispatch();
  const { followers, status } = useSelector((store) => store.profileReducer);

  useSubscribeToFollowers({
    userId: id,
    action: (following) => dispatch(setFollowers(following)),
    dependancies: [id],
  });

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <AccountCircle sx={{ mr: 2 }} />
          <Typography sx={{ mr: "auto" }}>Followers</Typography>
        </Toolbar>
      </AppBar>
      <List>
        {followers.length === 0 && <Typography>User has no followers.</Typography>}
        {followers?.map((person) => {
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

export default FollowersPanel;
