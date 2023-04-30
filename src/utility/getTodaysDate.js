import { format } from "date-fns";

export default function getTodaysDate() {
  const date = format(Date.now(), "yyyy-MM-dd");
  return date;
}
