import { AccessTimeOutlined } from "@mui/icons-material";
import { Typography, Stack } from "@mui/material";
import formatTime from "../../../../common/util/formatDateCalendar";

const Date = ({ date }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <AccessTimeOutlined fontSize="small" />
      <Typography variant="body2">{formatTime(date).calendar}</Typography>
      <Typography variant="body2">{formatTime(date).toX}</Typography>
    </Stack>
  );
};

export default Date;
