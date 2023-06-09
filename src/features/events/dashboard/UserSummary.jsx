import { Stack, Box, Avatar, Typography, List, ListItem, ListItemText } from "@mui/material";
import defaultImage from "../../../common/images/defaultPhoto.jpg";
import useSubscribeToUser from "../../../hooks/useSubscribeToUser";
import { useState } from "react";

const UserSummary = ({ userId }) => {
  const [user, setUser] = useState(null);

  useSubscribeToUser({
    action: (user) => setUser(user),
    dependancies: [userId],
    userId: userId,
  });

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stack>
        <Box mb={4} sx={{ display: "grid", justifyItems: "center", gap: 2 }}>
          <Avatar src={user.photoURL || defaultImage} sx={{ width: 84, height: 84 }} />
          <Typography gutterBottom>{user.displayName}</Typography>
        </Box>
        <List>
          {/* <ListItem divider dense disablePadding>
            <ListItemText primary="Attending" secondary="2" sx={{ display: "flex", justifyContent: "space-between" }} />
          </ListItem> */}
          <ListItem divider dense disablePadding>
            <ListItemText
              primary="Followers"
              secondary={user.followers || 0}
              sx={{ display: "flex", justifyContent: "space-between" }}
            />
          </ListItem>
          <ListItem divider dense disablePadding>
            <ListItemText
              primary="Following"
              secondary={user.following || 0}
              sx={{ display: "flex", justifyContent: "space-between" }}
            />
          </ListItem>
        </List>
      </Stack>
    </Box>
  );
};

export default UserSummary;
