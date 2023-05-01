import { format } from "date-fns";

export default function getDate(d) {
  const date = format(d, "yyyy-MM-dd");
  console.log(date);
  return date;
}
