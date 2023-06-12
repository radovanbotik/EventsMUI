import Image from "mui-image";
import trnava from "../../../../common/images/trnava.webp";
import { Box } from "@mui/material";

const BgImageWithOverlay = ({ image }) => {
  return (
    <>
      <Image src={image || trnava} style={{ aspectRatio: 1 / 1 }} />
      <Box
        className="shade-gradient-overlay"
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
    </>
  );
};

export default BgImageWithOverlay;
