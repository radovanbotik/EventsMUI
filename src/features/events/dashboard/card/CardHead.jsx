import { MoreVert } from "@mui/icons-material";
import { CardHeader, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CardHead = ({ hostId, hostPhotoURL, title, hostedBy }) => {
  return (
    <CardHeader
      action={<MoreVert sx={{ color: "text.secondary" }} />}
      avatar={
        <Avatar
          component={Link}
          to={`/users/profile/${hostId}`}
          aria-label="host"
          src={hostPhotoURL}
          imgProps={{ loading: "lazy" }}
          // sx={{ height: { xs: 32 }, width: { xs: 32 } }}
        />
      }
      title={title}
      subheader={
        <Typography variant="body2" color="text.secondary">
          by{" "}
          <Typography
            sx={{ textDecoration: "none" }}
            variant="body2"
            color="text.secondary"
            component={Link}
            to={`/users/profile/${hostId}`}
          >
            {hostedBy}
          </Typography>
        </Typography>
      }
    />
  );
};

export default CardHead;
