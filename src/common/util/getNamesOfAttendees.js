const getNamesOfAttendees = ({ totalAttendees, attendees }) => {
  const length = totalAttendees < attendees.length ? attendees.length : totalAttendees;
  const names = attendees
    .slice(0, length)
    .map(attendee => attendee.name.split(" ")[0])
    .join(" and ");

  const adjustVerbToLength = attendees.length > 1 ? "are going" : "is going";

  return `${names} ${adjustVerbToLength}`;
};

export default getNamesOfAttendees;
