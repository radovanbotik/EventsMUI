import { Box, Stack } from "@mui/material";
import Auth from "./auth/Auth";
import Cover from "./cover/Cover";

const Landing = () => {
  return (
    <Stack direction="row" sx={{ height: "100%", width: "100%" }}>
      <Auth />
      <Cover />
    </Stack>
  );
};

export default Landing;
