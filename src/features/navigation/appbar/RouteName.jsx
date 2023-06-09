import { useState } from "react";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import useGetPathName from "../../../hooks/useGetPathName";

const RouteName = () => {
  const [pathName, setPathName] = useState(null);
  const location = useLocation();
  useGetPathName({
    action: (pathname) => setPathName(pathname),
    dependecies: [location],
  });

  return (
    <Typography variant="h6" noWrap component="div" sx={{ mr: "auto", textTransform: "capitalize" }}>
      {pathName}
    </Typography>
  );
};

export default RouteName;
