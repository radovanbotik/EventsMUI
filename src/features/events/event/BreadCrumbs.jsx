import { Breadcrumbs, Box, Link as MLink } from "@mui/material";
import { useParams, useLocation, Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
}

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const mainRoute = pathname.split("/");

  return (
    <Box role="presentation" onClick={handleClick} sx={{ pt: 5 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <MLink
          underline="hover"
          color="inherit"
          component={Link}
          to={`/${mainRoute[1]}`}
          sx={{ textTransform: "capitalize" }}
        >
          {mainRoute[1]}
        </MLink>

        <MLink
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
          component={Link}
          to={pathname}
          sx={{ textTransform: "capitalize" }}
        >
          {mainRoute[2]}
        </MLink>
      </Breadcrumbs>
    </Box>
  );
};
export default BreadCrumbs;
