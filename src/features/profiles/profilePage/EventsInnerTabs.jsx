import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
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
  const { children, value, tab, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== tab}
      id={`simple-tabpanel-${value}`}
      aria-labelledby={`simple-tab-${value}`}
      {...other}
    >
      {value === tab && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function EventsInnerTabs({ tab, handleChange, events }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          {lookUp.map((entry) => (
            <Tab key={entry.id} label={entry.label} value={entry.value} {...a11yProps(entry.value)} />
          ))}
        </Tabs>
      </Box>
      {lookUp.map((entry) => (
        <TabPanel key={entry.id} value={entry.value} tab={tab}>
          <EventsInnerTabsContent events={events} />
        </TabPanel>
      ))}
    </Box>
  );
}
