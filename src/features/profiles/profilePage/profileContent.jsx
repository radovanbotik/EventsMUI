import * as React from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import AboutPanel from "./AboutPanel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(user) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="About me" {...a11yProps(0)} />
          <Tab label="Photos" {...a11yProps(1)} />
          <Tab label="Events" {...a11yProps(2)} />
          <Tab label="Followers" {...a11yProps(3)} />
          <Tab label="Following" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AboutPanel {...user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        photos
      </TabPanel>
      <TabPanel value={value} index={2}>
        events
      </TabPanel>
      <TabPanel value={value} index={3}>
        followers
      </TabPanel>
      <TabPanel value={value} index={4}>
        following
      </TabPanel>
    </Box>
  );
}
