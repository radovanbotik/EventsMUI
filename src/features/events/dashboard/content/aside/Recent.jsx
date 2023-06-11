import { Stack, Typography } from "@mui/material";
import RecentPost from "./RecentPost";
import HeadingH6 from "../../common/headingH6";

const Recent = ({ events }) => {
  return (
    <Stack direction="column" spacing={2}>
      <HeadingH6>Recent:</HeadingH6>
      {events.map((event) => (
        <RecentPost key={event.id} event={event} />
      ))}
    </Stack>
  );
};

export default Recent;
