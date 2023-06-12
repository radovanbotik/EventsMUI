import { Stack, Link, ButtonBase } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";

const Links = ({ routes }) => {
  const dispatch = useDispatch();
  return (
    <Stack
      direction="row"
      ml={6}
      spacing={4}
      sx={{ mr: "auto", display: { xs: "none", sm: "block", alignContent: "center" } }}
    >
      <ButtonBase
        sx={{ cursor: "pointer", color: "text.primary", fontSize: "body2.fontSize", textTransform: "capitalize" }}
        onClick={() => dispatch(openModal({ modalType: "event" }))}
      >
        add event
      </ButtonBase>
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
