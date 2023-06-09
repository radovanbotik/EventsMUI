import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Auth from "./auth/Auth";
import Cover from "./cover/Cover";

const Landing = () => {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack direction="row" sx={{ height: "100%", width: "100%" }}>
      <Auth />
      {largeScreen && <Cover />}
    </Stack>
  );
};

export default Landing;
