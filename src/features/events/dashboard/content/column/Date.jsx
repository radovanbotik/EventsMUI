import { Stack, Typography, Box } from "@mui/material";
import formatTime from "../../../../../common/util/formatDateCalendar";

const Date = ({ date }) => {
  const calendarDate = formatTime(date).calendar;
  const timeRemaining = formatTime(date).toX;

  return (
    <Stack direction="column" sx={{ color: "text.secondary" }}>
      <Typography variant="subtitle2">{calendarDate}</Typography>
      <Typography variant="subtitle2">{timeRemaining}</Typography>
    </Stack>
  );
};

export default Date;
