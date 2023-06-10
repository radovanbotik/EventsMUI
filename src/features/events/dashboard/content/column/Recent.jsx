import { Stack, Typography } from "@mui/material";
import RecentPost from "./RecentPost";

const Recent = ({ events }) => {
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        Recent:
      </Typography>
      {events.map((event) => (
        <RecentPost key={event.id} event={event} />
      ))}
    </Stack>
  );
};

export default Recent;
