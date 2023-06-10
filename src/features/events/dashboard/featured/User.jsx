import { Avatar, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const User = ({ hostPhotoURL, hostId, hostedBy }) => {
  return (
    <Stack direction="row" spacing={1} component={Link} to={`/users/profile/${hostId}`} sx={{ alignItems: "center" }}>
      <Avatar variant="circular" src={hostPhotoURL} sx={{ width: 32, height: 32 }} />
      <Typography color="white">{hostedBy}</Typography>
    </Stack>
  );
};

export default User;
