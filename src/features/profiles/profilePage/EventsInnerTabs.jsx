import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import EventsInnerTabsContent from "./EventsInnerTabsContent";

const lookUp = [
  {
    id: 1,
    label: "hosting",
    value: "hosting",
    content: "events hosted by user",
  },
  {
    id: 2,
    label: "attending",
    value: "attending",
    content: "events user is attending",
  },
  {
    id: 3,
    label: "past events",
    value: "attended",
    content: "users past events",
  },
];

function TabPanel(props) {
  const { children, value, attendanceType, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== attendanceType}
      id={`simple-tabpanel-${value}`}
      aria-labelledby={`simple-tab-${value}`}
      {...other}
    >
      {value === attendanceType && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(value) {
  return {
    id: `simple-tab-${value}`,
    "aria-controls": `simple-tabpanel-${value}`,
  };
}

export default function EventsInnerTabs({ attendanceType, handleChange, events }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={attendanceType} onChange={handleChange} aria-label="basic tabs example">
          {/* <Tab label="hosting" value="hosting" {...a11yProps("hosting")} />
          <Tab label="going" value="going" {...a11yProps("going")} />
          <Tab label="past events" value="attended" {...a11yProps("attended")} /> */}
          {lookUp.map((entry) => (
            <Tab key={entry.id} label={entry.label} value={entry.value} {...a11yProps(entry.value)} />
          ))}
        </Tabs>
      </Box>
      {lookUp.map((entry) => (
        <TabPanel key={entry.id} value={entry.value} attendanceType={attendanceType}>
          <EventsInnerTabsContent events={events} />
          {/* {entry.content} */}
          {/* {events?.map(ev => (
            <div key={ev.id}>{ev.title}</div>
          ))} */}
        </TabPanel>
      ))}
      {/* <TabPanel value="hosting" Tab={tab}>
        Events I am hosting
      </TabPanel>
      <TabPanel value="going" Tab={tab}>
        Events I am going
      </TabPanel>
      <TabPanel value="attended" Tab={tab}>
        Past events
      </TabPanel> */}
    </Box>
  );
}
