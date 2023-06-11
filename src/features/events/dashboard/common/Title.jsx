import { Link as MLink } from "@mui/material";
import { Link } from "react-router-dom";

const Title = ({ title, id }) => {
  return (
    <MLink
      underline="hover"
      component={Link}
      to={`event/${id}`}
      sx={{ fontSize: "h5.fontSize", textTransform: "capitalize", color: "inherit" }}
    >
      {title}
    </MLink>
  );
};

export default Title;
