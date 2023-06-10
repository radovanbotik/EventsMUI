import { Box, Stack } from "@mui/material";
import Title from "./Title";
import Controls from "./Controls";

const Header = () => {
  return (
    <Stack mb={10} direction="row" alignItems="center">
      <Title />
      <Controls />
    </Stack>
  );
};

export default Header;
