const getNamesOfAttendees = ({ totalAttendees, attendees, filterOptions }) => {
  const length = totalAttendees < attendees.length ? attendees.length : totalAttendees;
  const names = attendees
    .slice(0, length)
    .map(attendee => attendee.name.split(" ")[0])
    .join(" and ");

  // const adjustVerbToLength = attendees.length > 1 ? "are going" : "is going";
  let adjustVerbToLength;

  switch (filterOptions.attendanceType) {
    case "attended":
      adjustVerbToLength = "went";

      break;

    default:
      adjustVerbToLength = attendees.length > 1 ? "are going" : "is going";
      break;
  }

  return `${names} ${adjustVerbToLength}`;
};

export default getNamesOfAttendees;
