import { format } from "date-fns";

export default function getDate(d) {
  const date = format(d, "HH:mm");
  return date;
}
