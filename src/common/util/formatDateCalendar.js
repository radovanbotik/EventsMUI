import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(calendar);
dayjs.extend(relativeTime);

const formatTime = (date) => {
  const calendar = dayjs(date).calendar(null, {
    sameDay: "[Today at] h:mm A",
    nextDay: "[Tomorrow] h:mm A",
    nextWeek: "dddd [at] h:mm A",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
    sameElse: "DD/MM/YYYY",
  });
  const toX = dayjs().to(date);
  return { calendar, toX };
};

export default formatTime;
