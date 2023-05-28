import isExpired from "./isExpired";

const getNamesOfAttendees = ({ totalAttendees, attendees, date }) => {
  const expired = isExpired(date);

  const length = totalAttendees < attendees.length ? attendees.length : totalAttendees;
  const names = attendees
    .slice(0, length)
    .map((attendee) => attendee.name.split(" ")[0])
    .join(" and ");

  let adjustVerbToLength;

  if (expired) {
    adjustVerbToLength = "went";
  } else {
    adjustVerbToLength = attendees.length > 1 ? "are going" : "is going";
  }

  return `${names} ${adjustVerbToLength}`;
};

export default getNamesOfAttendees;
