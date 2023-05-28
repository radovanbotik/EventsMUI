import isExpired from "./isExpired";

const isGoingAreGoingNoOneGoing = ({ length, date }) => {
  const expired = isExpired(date);
  if (expired) {
    if (length === 0) return "no one went";
    if (length === 1) return `${length} person went`;
    if (length > 1) return `${length} people went`;
  } else {
    if (length === 0) return "no one is attending";
    if (length === 1) return `${length} person is attending`;
    if (length > 1) return `${length} people are attending`;
  }
};
export default isGoingAreGoingNoOneGoing;
