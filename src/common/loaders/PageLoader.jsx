import { CircularProgress, Box } from "@mui/material";

const PageLoader = () => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 128px)",
        display: "grid",
        placeContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
