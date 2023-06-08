import { Divider } from "@mui/material";
import SidebarActions from "./sidebar/SidebarActions";
import SidebarEvents from "./sidebar/SidebarEvents";
import SidebarUsers from "./sidebar/SidebarUsers";

const Sidebar = ({ setMobileOpen }) => {
  return (
    <>
      <SidebarActions setMobileOpen={setMobileOpen} />
      <Divider />
      <SidebarEvents setMobileOpen={setMobileOpen} />
      <Divider />
      <SidebarUsers setMobileOpen={setMobileOpen} />
      <Divider />
    </>
  );
};

export default Sidebar;
