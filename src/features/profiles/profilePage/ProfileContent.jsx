import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import AboutPanel from "./AboutPanel";
import PhotosPanel from "./PhotosPanel";
import EventsPanel from "./EventsPanel";
import FollowingPanel from "./FollowingPanel";
import FollowersPanel from "./FollowersPanel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileContent = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(props);
  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          maxWidth: { xs: 400, sm: 480, md: "100%" },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="About me" {...a11yProps(0)} />
          <Tab label="Photos" {...a11yProps(1)} />
          <Tab label="Events" {...a11yProps(2)} />
          <Tab label="Followers" {...a11yProps(3)} />
          <Tab label="Following" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AboutPanel {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PhotosPanel {...props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EventsPanel {...props} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FollowersPanel {...props} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <FollowingPanel {...props} />
      </TabPanel>
    </>
  );
};

export default ProfileContent;
