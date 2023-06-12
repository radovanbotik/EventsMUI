import { Stack, Link, ButtonBase } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

const Links = ({ routes }) => {
  return (
    <Stack direction="row" ml={6} spacing={4} sx={{ display: { xs: "none", sm: "block", alignContent: "center" } }}>
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
