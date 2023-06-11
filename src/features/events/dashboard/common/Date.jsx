import { Stack, Typography, Box } from "@mui/material";
import formatTime from "../../../../common/util/formatDateCalendar";

const Date = ({ date }) => {
  const calendarDate = formatTime(date).calendar;
  const timeRemaining = formatTime(date).toX;

  return (
    <Stack direction="row" alignItems="center" sx={{ flexWrap: "wrap", color: "inherit", maxWidth: "20ch" }}>
      <Typography variant="body2">{calendarDate}</Typography>
      <Box
        sx={{
          borderRadius: "50%",
          width: "1px",
          height: "1px",
          p: 0.25,
          backgroundColor: "white",
          mx: 1,
          mixBlendMode: "difference",
        }}
      ></Box>
      <Typography variant="body2">{timeRemaining}</Typography>
    </Stack>
  );
};

export default Date;
