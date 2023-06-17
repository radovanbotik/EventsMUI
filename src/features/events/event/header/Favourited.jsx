import { Stack, Typography } from "@mui/material";
import { FavoriteOutlined } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

const Favourited = ({ favourited }) => {
  return (
    <Stack direction="row" alignItems="center">
      <FavoriteOutlined fontSize="small" sx={{ color: pink[400] }} />
      <Typography variant="span" sx={{ fontWeight: 600, mx: 1 }}>
        10
      </Typography>
      <Typography variant="body2">favourited</Typography>
    </Stack>
  );
};

export default Favourited;
