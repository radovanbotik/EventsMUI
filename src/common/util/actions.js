import {
  EventOutlined,
  EventAvailableOutlined,
  EventBusyOutlined,
  TodayOutlined,
  Event,
  PeopleOutlineOutlined,
} from "@mui/icons-material";

const eventActions = [
  { id: "a", name: "All Events", route: "/events", icon: EventOutlined },
  { id: "c", name: "Hosting", route: "/events", icon: TodayOutlined },
  { id: "d", name: "Attending", route: "/events", icon: EventAvailableOutlined },
  { id: "e", name: "Past Events", route: "/events", icon: EventBusyOutlined },
];

const usersActions = [{ id: "b", name: "Other Users", route: "/users", icon: PeopleOutlineOutlined }];

export { eventActions, usersActions };
