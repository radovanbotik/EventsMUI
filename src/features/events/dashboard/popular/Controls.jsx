import { IconButton, Stack } from "@mui/material";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

const Controls = () => {
  return (
    <Stack direction="row" spacing={4}>
      <IconButton className="popular-swiper-prev">
        <ArrowBackIosOutlined sx={{ height: 16, width: 16 }} />
      </IconButton>
      <IconButton className="popular-swiper-next">
        <ArrowForwardIosOutlined sx={{ height: 16, width: 16 }} />
      </IconButton>
    </Stack>
  );
};

export default Controls;
