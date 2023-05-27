import { Box } from "@mui/material";

const ImagePreview = () => {
  return (
    <Box
      style={{
        height: "200px",
        flex: 1,
        width: "100%",
        aspectRatio: 16 / 9,
        display: "grid",
        placeContent: "center",
      }}
    >
      <Box
        className="img-cropped"
        style={{
          height: "200px",
          width: "100%",
          overflow: "hidden",
          aspectRatio: 16 / 9,
        }}
      ></Box>
    </Box>
  );
};

export default ImagePreview;
