import { Stack, Typography } from "@mui/material";
import { PlaceOutlined } from "@mui/icons-material";

const Location = ({ location }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <PlaceOutlined fontSize="small" />
      <Typography variant="body2">{location.description}</Typography>
    </Stack>
  );
};

export default Location;
