import { Box, Typography } from "@mui/material";

const Slide = ({ city, photo }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
      }}
    >
      <img
        src={photo}
        alt="trnava"
        style={{ position: "absolute", width: "100%", height: "100%", display: "block", objectFit: "cover" }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          zIndex: 2,
        }}
        className="gradient-overlay"
      />
      {/* <Typography style={{ zIndex: 3 }} variant="h1" sx={{ mb: 10 }} color={"white"} textTransform="uppercase">
        {city}
      </Typography> */}
    </Box>
  );
};

export default Slide;
