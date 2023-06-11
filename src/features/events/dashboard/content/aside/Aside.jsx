import { Stack } from "@mui/material";
import Filters from "./Filters";
import Recent from "./Recent";
import Ad from "./Ad";
import Feed from "./Feed";

const Aside = ({ events }) => {
  return (
    <Stack direction="column" spacing={4}>
      <Filters />
      <Recent events={events} />
      <Feed />
      <Ad />
    </Stack>
  );
};

export default Aside;
