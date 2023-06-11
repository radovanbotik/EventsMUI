import { Avatar, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Author = ({ hostPhotoURL, hostId, hostedBy }) => {
  return (
    <Stack
      color="inherit"
      direction="row"
      spacing={1}
      component={Link}
      to={`/users/profile/${hostId}`}
      sx={{ alignItems: "center", textDecoration: "none" }}
    >
      <Avatar variant="circular" src={hostPhotoURL} sx={{ width: 32, height: 32 }} />
      <Typography color="inherit">{hostedBy}</Typography>
    </Stack>
  );
};

export default Author;
