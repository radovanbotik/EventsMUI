import { useRouteError } from "react-router-dom";
import { Box } from "@mui/system";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <Box sx={{ height: "100%", minHeight: "100vh" }}>
      Error message: {error.statusText || error.message}
    </Box>
  );
};

export default Error;
