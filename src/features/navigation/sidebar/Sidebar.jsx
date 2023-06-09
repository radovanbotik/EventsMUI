import { Divider } from "@mui/material";
import SidebarActions from "./SidebarActions";
import SidebarEvents from "./SidebarEvents";
import SidebarUsers from "./SidebarUsers";

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
