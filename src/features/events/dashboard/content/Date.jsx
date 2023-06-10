import { Stack, Typography, Box } from "@mui/material";
import formatTime from "../../../../common/util/formatDateCalendar";

const Date = ({ date }) => {
  const calendarDate = formatTime(date).calendar;
  const timeRemaining = formatTime(date).toX;

  return (
    <Stack direction="row" alignItems="center" sx={{ flexWrap: "wrap", color: "text.secondary" }}>
      <Typography variant="subtitle2">{calendarDate}</Typography>
      <Box sx={{ borderRadius: "50%", width: "1px", height: "1px", p: 0.25, backgroundColor: "white", mx: 1 }}></Box>
      <Typography variant="subtitle2">{timeRemaining}</Typography>
    </Stack>
  );
};

export default Date;
