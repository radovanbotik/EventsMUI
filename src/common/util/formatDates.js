import dayjs from "dayjs";

const formatDates = ({ date, format }) => {
  return dayjs(date).format(format);
};
export default formatDates;
