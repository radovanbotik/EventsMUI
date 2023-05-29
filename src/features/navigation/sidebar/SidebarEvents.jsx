import { useState } from "react";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Badge,
  ListItemText,
  styled,
} from "@mui/material";
import {
  EventOutlined,
  TodayOutlined,
  EventAvailableOutlined,
  EventBusyOutlined,
  EventRepeatOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../../../store/eventSlice";
import useSubscribeEvents from "../../../hooks/useSubscribeEvents";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const SidebarEvents = () => {
  const [count, setCount] = useState({
    active: 0,
    hosting: 0,
    attending: 0,
    attended: 0,
    expired: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((store) => store.authReducer);

  const avaibleFilter = {
    date: new Date().getTime(),
    attendanceType: "active",
  };
  const hostingFilter = {
    attendanceType: "hosting",
    date: new Date().getTime(),
  };
  const attendingFilter = {
    attendanceType: "attending",
    date: new Date().getTime(),
  };
  const attendedFilter = {
    attendanceType: "attended",
    date: new Date().getTime(),
  };
  const expiredFilter = {
    date: new Date().getTime(),
    attendanceType: "expired",
  };

  const applyFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  const eventActions = [
    {
      id: "ea1",
      name: "Active",
      location: "/events",
      attendanceType: "all",
      count: count.active || 0,
      action() {
        navigate(this.location);
        applyFilter(avaibleFilter);
      },
      icon: EventOutlined,
    },
    {
      id: "ea2",
      name: "Hosting",
      location: "/events",
      attendanceType: "hosting",
      count: count.hosting || 0,
      action() {
        navigate(this.location);
        applyFilter(hostingFilter);
      },
      icon: TodayOutlined,
    },
    {
      id: "ea3",
      name: "Attending",
      location: "/events",
      attendanceType: "attending",
      count: count.attending || 0,
      action() {
        navigate(this.location);
        applyFilter(attendingFilter);
      },
      icon: EventAvailableOutlined,
    },
    {
      id: "ea4",
      name: "Attended",
      location: "/events",
      attendanceType: "attended",
      count: count.attended || 0,
      action() {
        navigate(this.location);
        applyFilter(attendedFilter);
      },
      icon: EventRepeatOutlined,
    },
    {
      id: "ea5",
      name: "Expired",
      location: "/events",
      attendanceType: "attended",
      count: count.expired || 0,
      action() {
        navigate(this.location);
        applyFilter(expiredFilter);
      },
      icon: EventBusyOutlined,
    },
  ];

  useSubscribeEvents({
    filterOptions: {
      attendanceType: "active",
      date: new Date().getTime(),
    },
    action: (events) => setCount((prev) => ({ ...prev, active: events.length })),
  });
  useSubscribeEvents({
    userId: currentUser?.id,
    filterOptions: {
      attendanceType: "hosting",
      date: new Date().getTime(),
    },
    action: (events) => setCount((prev) => ({ ...prev, hosting: events.length })),
  });
  useSubscribeEvents({
    userId: currentUser?.id,
    filterOptions: {
      attendanceType: "attending",
      date: new Date().getTime(),
    },
    action: (events) => setCount((prev) => ({ ...prev, attending: events.length })),
  });
  useSubscribeEvents({
    userId: currentUser?.id,
    filterOptions: {
      attendanceType: "attended",
      date: new Date().getTime(),
    },
    action: (events) => setCount((prev) => ({ ...prev, attended: events.length })),
  });
  useSubscribeEvents({
    filterOptions: {
      attendanceType: "expired",
      date: new Date().getTime(),
    },
    action: (events) => setCount((prev) => ({ ...prev, expired: events.length })),
  });

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Events
        </ListSubheader>
      }
    >
      {eventActions.map((action) => (
        <ListItem key={action.id} disablePadding>
          <ListItemButton dense onClick={action.action.bind(action)}>
            <ListItemIcon>
              <StyledBadge badgeContent={action.count} color="secondary">
                {<action.icon />}
              </StyledBadge>
            </ListItemIcon>
            <ListItemText primary={action.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarEvents;
