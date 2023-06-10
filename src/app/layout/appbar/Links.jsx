import { Stack, Link, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Links = ({ routes }) => {
  return (
    <Stack direction="row" ml={6} spacing={6} sx={{ mr: "auto", display: { xs: "none", sm: "block" } }}>
      {routes.map((route) => (
        <Link
          key={route.route}
          underline="none"
          component={NavLink}
          to={route.location}
          sx={{ cursor: "pointer", color: "text.primary", fontSize: "body2.fontSize" }}
        >
          {route.route}
        </Link>
      ))}
    </Stack>
  );
};

export default Links;
