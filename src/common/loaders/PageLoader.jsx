import { CircularProgress, Box } from "@mui/material";

const PageLoader = () => {
  return (
    <Box sx={{ height: "100%", minHeight: "100vh", display: "grid", placeContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
