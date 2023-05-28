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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilter } from "../../../store/eventSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const SidebarEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //add events attending to profile
  //add events hosting to profile
  //add events attended to profile

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

  let allCount;
  let hostingCount;
  let attendingCount;

  let expiredEventsCount;
  const eventActions = [
    {
      id: "ea1",
      name: "Active",
      location: "/events",
      attendanceType: "all",
      count: allCount || 0,
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
      count: hostingCount || 0,
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
      count: attendingCount || 0,
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
      count: expiredEventsCount || 0,
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
      count: expiredEventsCount || 0,
      action() {
        navigate(this.location);
        applyFilter(expiredFilter);
      },
      icon: EventBusyOutlined,
    },
  ];

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
