import Image from "mui-image";
import trnava from "../../../../common/images/trnava.webp";

const BgImage = ({ image }) => {
  return <Image src={image || trnava} style={{ aspectRatio: 1 / 1 }} />;
};

export default BgImage;
