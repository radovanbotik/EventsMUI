import { Avatar, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Author = ({ hostPhotoURL, hostId, hostedBy }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      component={Link}
      to={`/users/profile/${hostId}`}
      sx={{ alignItems: "center", textDecoration: "none", color: "inherit" }}
    >
      <Avatar variant="circular" src={hostPhotoURL} sx={{ width: 32, height: 32 }} />
      <Typography variant="body2">{hostedBy}</Typography>
    </Stack>
  );
};

export default Author;
