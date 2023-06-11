import { Box } from "@mui/material";
import Image from "mui-image";
import trnava from "../../../../../common/images/szeged.webp";

const BgImage = () => {
  return (
    // // <Box sx={{ borderRadius: "10px", overflow: "hidden", height: "600px", width: "100%" }}>
    <Image src={trnava} fit="cover" height={500} style={{ borderRadius: "10px" }} />
    // // </Box>
  );
};

export default BgImage;
