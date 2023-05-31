import { Divider } from "@mui/material";
import SidebarActions from "./sidebar/SidebarActions";
import SidebarEvents from "./sidebar/SidebarEvents";
import SidebarUsers from "./sidebar/SidebarUsers";

const Sidebar = () => {
  return (
    <>
      <SidebarActions />
      <Divider />
      <SidebarEvents />
      <Divider />
      <SidebarUsers />
      <Divider />
    </>
  );
};

export default Sidebar;
