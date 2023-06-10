import { Typography } from "@mui/material";

const Title = () => {
  return (
    <Typography
      sx={{ fontSize: { xs: "h6.fontSize", md: "h5.fontSize", lg: "h4.fontSize" }, fontWeight: 700 }}
      mr="auto"
    >
      Popular Events
    </Typography>
  );
};

export default Title;
